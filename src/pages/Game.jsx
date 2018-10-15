import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import NumberPlate from '../components/NumberPlate'

const master = {
  0: [0, 1, 3],
  1: [1, 0, 2, 4],
  2: [2, 1, 5],
  3: [3, 0, 4, 6],
  4: [4, 1, 3, 5, 7],
  5: [5, 2, 4, 8],
  6: [6, 3, 7],
  7: [7, 4, 6, 8],
  8: [8, 5, 7]
}

class Game
 extends Component {

  constructor() {
    super()
    this.state = {
      numList: [[]],
      width: 3,
      height: 3,
      idxA: null,
      idxB: null,
      orFinish: false
    }
    this.initNumList = this.initNumList.bind(this)
    this.setIdx = this.setIdx.bind(this)
  }

  componentDidMount() {
    let {width, height} = this.state
    this.initNumList(width, height)
  }

  initNumList(width, height) {
    let newNumList = []
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        newNumList.push(i*width+j)
      }
    }
    this.shuffleNumList(newNumList)
    this.setState({numList: newNumList})
  }

  shuffleNumList(numList) {
    for (var i = numList.length - 1; i >= 0; i--){
      // 0~iのランダムな数値を取得
      var rand = Math.floor( Math.random() * ( i + 1 ) );
      // 配列の数値を入れ替える
      [numList[i], numList[rand]] = [numList[rand], numList[i]]
    }
  }

  initGame(width, height) {
    let plates = []
    let {numList} = this.state
    for(let i = 0; i < numList.length; i++) {
      plates.push(<NumberPlate key={`plate_${i}`} number={numList[i]} setIdx={(e) => {this.setIdx(e, i)}} />)
    }
    return plates
  }

  notValidSelect(idxA, i) {
    if (master[idxA].indexOf(i) >= 0) {
      return false
    } else return true
  }

  setIdx(e, i) {
    let plates = []
    let {numList, idxA} = this.state
    if (idxA === null) {
      e.target.classList.add('selected')
      plates = document.getElementsByClassName('NumberPlate')
      for (let j=1; j < master[i].length; j++) {
        plates[master[i][j]].classList.add('selectable')
      }
      this.setState({idxA: i})
    } else {
      if (this.notValidSelect(idxA, i)) {
        alert("その操作はできません")
        return
      }
      plates = document.getElementsByClassName('NumberPlate')
      for (let j=0; j < plates.length; j++) {
        plates[j].classList.remove('selected')
        plates[j].classList.remove('selectable')
      }
      this.swapPanel(numList, idxA, i)
      this.setState({idxA: null})
      if (this.chkFinish(numList)) {
        for (let j=0; j < plates.length; j++) {
          plates[j].classList.add('completed')
          this.setState({orFinish: true})
        }
      }
    }
  }

  swapPanel(numList, idxA, idxB) {
    let tmp = numList[idxA]
    numList[idxA] = numList[idxB]
    numList[idxB] = tmp
  }

  chkFinish(numList) {
    for (let i=0; i < numList.length; i++){
      if (numList[i] !== i) {
        return false
      }
    }
    return true
  }

  resetGame(width, height) {
    this.initNumList(width, height)
    let plates = document.getElementsByClassName('NumberPlate')
    for (let j=0; j < plates.length; j++) {
      plates[j].classList.remove('selected')
      plates[j].classList.remove('selectable')
      plates[j].classList.remove('completed')
    }
    this.setState({orFinish: false})
  }

  render() {
    let {orFinish, width, height} = this.state
    let gameView = this.initGame(3, 3)
    return (
      <div>
        <div className="CompMessage">{orFinish ? "CONGURATURATION": null}</div>
        <div className="Game">
          {gameView}
        </div>
        <div className="tryAgainButton" onClick={()=>this.resetGame(width, height)}>{orFinish ? "もう一度やる": null}</div>
        <Link to="/">トップに戻る</Link>
      </div>
    );
  }
}

export default Game
;
