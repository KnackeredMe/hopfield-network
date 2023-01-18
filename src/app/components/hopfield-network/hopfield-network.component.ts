import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-hopfield-network',
  templateUrl: './hopfield-network.component.html',
  styleUrls: ['./hopfield-network.component.css']
})
export class HopfieldNetworkComponent implements OnInit{
  width: number = 5;
  height: number = 7;
  size: number = this.width * this.height;
  inputPattern: number[][] = [[-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1]]
  outputPattern: number[][] = [[-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1]]
  patterns: number[][][] = [
     [[1, -1, -1, -1, 1],
      [1, -1, -1, -1, 1],
      [1, -1, -1, 1, 1],
      [1, -1, 1, -1, 1],
      [1, 1, -1, -1, 1],
      [1, -1, -1, -1, 1],
      [1, -1, -1, -1, 1]],

     [[1, -1, -1, -1, 1],
      [1, -1, -1, -1, 1],
      [1, -1, -1, -1, 1],
      [1, 1, 1, 1, 1],
      [1, -1, -1, -1, 1],
      [1, -1, -1, -1, 1],
      [1, -1, -1, -1, 1]],

     [[-1, 1, 1, 1, -1],
      [1, -1, 1, -1, 1],
      [1, -1, 1, -1, 1],
      [-1, 1, 1, 1, -1],
      [-1, -1, 1, -1, -1],
      [-1, -1, 1, -1, -1],
      [-1, -1, 1, -1, -1]],
  ]
  weights: number[][][] = new Array(this.patterns.length);

  ngOnInit() {
    this.initWeights();
    this.patterns.forEach((pattern, index) => {
      const weights = [this.weights[index]];
      const flatPatterns = this.flatPatterns([pattern]);
      const flatWeights = this.flatPatterns(weights).filter(weights => weights);
      this.foldWeights(this.train(flatPatterns, flatWeights), index);
    })
  }

  train(flatPatterns, flatWeights) {
    for(let w = 0; w < flatWeights.length; w++) {
      for (let p = 0; p < flatPatterns.length; p++) {
        for (let i = 0; i < this.size; i++) {
          for (let j = 0; j < this.size; j++) {
            flatWeights[w][i] += flatPatterns[p][i] * flatPatterns[p][j];
          }
        }
      }
    }
    return flatWeights;
  }

  initWeights() {
    for(let w = 0; w < this.patterns.length; w++) {
      this.weights[w] = new Array(this.patterns.length);
      for (let i = 0; i < this.height; i++) {
        this.weights[w][i] = new Array(this.width);
        for (let j = 0; j < this.width; j++) {
          this.weights[w][i][j] = Math.random();
        }
      }
    }
  }

  update(pattern) {
    const resultPatterns = new Array(this.weights.length);
    for(let w = 0; w < this.weights.length; w++) {
      resultPatterns[w] = new Array(this.height);
      for (let i = 0; i < this.height; i++) {
        resultPatterns[w][i] = new Array(this.width);
        for (let j = 0; j < this.width; j++) {
          resultPatterns[w][i][j] = this.weights[w][i][j] * pattern[i][j] > 0 ? 1 : -1;
          if (pattern[i][j] > resultPatterns[w][i][j]) {
            resultPatterns[w][i][j] = pattern[i][j];
          }
        }
      }
    }
    return resultPatterns;
  }

  recognize() {
    const resultPatterns = this.update(this.inputPattern);
    resultPatterns.forEach(resultPattern => {
      this.patterns.forEach(pattern => {
        if (JSON.stringify(resultPattern) === JSON.stringify(pattern)) {
          this.outputPattern = resultPattern;
          return;
        }
      })
    })
  }

  flatPatterns(patterns) {
    return patterns.map((pattern) => {
      return pattern.reduce((prev, curr) => {
        return prev.concat(curr);
      }, []);
    });
  }

  flatPatterns2(patterns) {
    return patterns.map((pattern) => {
      return pattern.reduce((prev, curr) => {
        return prev.concat(curr);
      }, []);
    });
  }

  flatWeights(weights) {
    const flatWeights = [];
    for(let i = 0; i < weights.length; i++) {
      flatWeights.push(...weights[i]);
    }
    return flatWeights;
  }

  foldWeights(flatWeights, w) {
    for (let i = 0; i < this.height; i++) {
      this.weights[w][i] = [];
      for (let j = 0; j < this.width; j++) {
        this.weights[w][i][j] = flatWeights[0][i * this.width + j];
      }
    }
  }
}
