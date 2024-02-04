let moves, totalMoves;

function illuminate(cellPos, time) {
    const audioElement = document.getElementById('sound' + capitalizeFirstLetter(getColor(cellPos)));
    const cell = document.querySelector('.cell[pos="' + cellPos + '"]');

    setTimeout(() => {
        cell.classList.add('active');
        audioElement.play();

        setTimeout(() => {
            cell.classList.remove('active');
            audioElement.pause();
            audioElement.currentTime = 0;
        }, 300);
    }, time);
}

function playSound(cellPos) {
    const audioElement = document.getElementById('sound' + capitalizeFirstLetter(getColor(cellPos)));
    audioElement.play();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getColor(cellPos) {
    switch (parseInt(cellPos)) {
        case 1:
            return 'red';
        case 2:
            return 'green';
        case 3:
            return 'blue';
        case 4:
            return 'yellow';
        default:
            return '';
    }
}


function setMoves(current) {
    moves.push(Math.floor(Math.random() * 4) + 1);
    if (current < totalMoves) {
        setMoves(++current);
    }
}

function startGame() {
    moves=[];
    totalMoves=2;
    document.querySelector(('#start')).style.display = 'none';
    document.querySelector(('#message')).style.display = 'block';
    sequence();
}

function sequence() {
    moves = [];
    setMoves(1);
    document.querySelector('#message').innerHTML = 'Simon says';

    for(let i=0; i < moves.length; i++){
        illuminate(moves[i], 600 *i);
    }

    setTimeout(() => {
        document.querySelector('#message').innerHTML = 'Replicate the sequence';
    }, 600 * moves.length);
}

function cellClick(e) {
    let cellPos = e.target.getAttribute('pos');
    illuminate(cellPos, 0);

    if(moves && moves.length) {
        if (moves[0] == cellPos) {
            moves.shift();

            if (!moves.length) {
                totalMoves++;
                setTimeout(()=>{sequence()},1000)
            }
        }
        else{
            document.querySelector('#message').innerHTML ='GAME OVER';
            setTimeout(() => {
                document.querySelector('#start').style.display = "block";
                document.querySelector('#message').style.display = "none";
            }, 1000);
        }
    }
}

document.querySelector('#start').addEventListener('click', startGame);
let cells = Array.from(document.getElementsByClassName('cell'));

cells.forEach(cell => {
    cell.addEventListener('click', cellClick);
})