var highScoresList = document.querySelector('#highScoresList')
var highScores = JSON.parse(localStorage.getItem('highScores')) || []

highScoresList.innerHTML
