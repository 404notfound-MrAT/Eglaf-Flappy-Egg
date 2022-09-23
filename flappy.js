document.addEventListener("DOMContentLoaded", ()=>{
    const ghost = document.querySelector(".ghost")
    const game =document.querySelector(".game-container")
    const ground = document.querySelector(".ground")

    let ghostLeft = 220
    let ghostBottom = 100
    let gravity = 2
    let gameover = false
    let gap = 450

    function start(){
        ghostBottom -= gravity
        ghost.style.bottom = ghostBottom + "px"
        ghost.style.left = ghostLeft + "px"
    }
    let gameTimerId = setInterval(start ,20)

    function jump(){
        if(ghostBottom < 500){
            ghostBottom += 50
            ghost.style.bottom = ghostBottom + "px"
        }
    }

    document.addEventListener("touchstart",jump)
    document.addEventListener("click",jump)

    function generateObstacle(){
        let randomHeight = Math.random()*80
        let obstacleLeft = 500
        let obstacleBottom = randomHeight
        const obstacle = document.createElement("div")
        const topobstacle = document.createElement("div")
        if(! gameover){
            obstacle.classList.add("obstacle")
            topobstacle.classList.add("topobstacle")
        }
        game.appendChild(obstacle)
        game.appendChild(topobstacle)
        obstacle.style.left = obstacleLeft + "px"
        obstacle.style.bottom = obstacleBottom + "px"
        topobstacle.style.left = obstacleLeft + "px"
        topobstacle.style.bottom = obstacleBottom + gap + "px"

        function moveObstacle(){
            obstacleLeft -= 2
            obstacle.style.left = obstacleLeft + "px"
            topobstacle.style.left = obstacleLeft + "px"

            if (obstacleLeft === -60){
                clearInterval(timerId)
                game.removeChild(obstacle)
                game.removeChild(topobstacle)
            }
            if (obstacleLeft >200 && obstacleLeft <280 && ghostLeft ===220 && (ghostBottom < obstacleBottom +152 ||ghostBottom > obstacleBottom + gap -200) ||ghostBottom === 0){
                gameOver()
                clearInterval(timerId)
            }
        }
        let timerId = setInterval(moveObstacle, 20)
        if(! gameover){setTimeout(generateObstacle, 2000)}
    }
    generateObstacle()

    function gameOver(){
        clearInterval(gameTimerId)
        gameover = true
        document.removeEventListener("click")
        document.removeEventListener("touchstart")
    }
})
