const URL_MATCHES = 'https://api.football-data.org/v2/competitions/PL/matches?matchday=';
const URL_SCORERS = 'https://api.football-data.org/v2/competitions/'
const TOKEN_ID = '08975981a39e439ba05ad929002f41b9';
//https://api.football-data.org/v2/competitions/SA/scorers

const togglePreloader = () => {
    const containerPreloader = document.querySelector('.wrap-preloader');
    containerPreloader.classList.toggle('preloader-show');
}


const getResource = async (url) => {
    const res = await fetch(url,{
        method: 'GET',
        headers : {
            'X-Auth-Token': TOKEN_ID
        }
    });
    return res.json();
}

const getMatchesInfo = async (tourId) =>{
    const result = await getResource(`${URL_MATCHES}${tourId}`);
    //console.log(result);
    return result;
}
const getScorersInfo = async (country) => {
    const result1 = await getResource(`${URL_SCORERS}${country}/scorers`);
    return result1;
}

const renderScorers = async (currentCountry) => {
    togglePreloader();
    const data1 = await getScorersInfo(currentCountry);
    //console.log(data1.scorers);
    const containerMatches = document.querySelector('#list-matches');
    containerMatches.innerHTML = '';
    data1.scorers.forEach((item) => {
        containerMatches.innerHTML += `
        <a href="#!" class="collection-item"><span class="badge">${item.numberOfGoals}</span><span class="badge">Goals:</span>${item.player.name} | ${item.team.name}</a>
        `
    })  
    togglePreloader();  
}




//getMatchesInfo();

const renderMatches = async () => {
    const currentTour = document.querySelector('#current-tour').value;
    togglePreloader();
    const data = await getMatchesInfo(currentTour);
    //console.log(data)
    const containerMatches = document.querySelector('#list-matches');
    containerMatches.innerHTML = '';
    data.matches.forEach((item)=>{
        let homeScore = '';
        let awayScore = '';
        if(item.status === 'FINISHED'){
            homeScore = item.score.fullTime.homeTeam;
            awayScore = item.score.fullTime.awayTeam;
        }
        containerMatches.innerHTML += `
        <a href="#!" class="collection-item"><span class="badge">${item.awayTeam.name}</span>
        <span class="badge">${item.homeTeam.name}</span>${item.utcDate} | ${homeScore} - ${awayScore} |</a>
        `
    })
    togglePreloader();
}


renderMatches();

document.querySelector('#current-tour').addEventListener('change', renderMatches);
document.querySelector('[data-league="SA"]').addEventListener('click', () => {
    renderScorers('SA');
})
document.querySelector('[data-league="PL"]').addEventListener('click', () => {
    renderScorers('PL');
})
document.querySelector('[data-league="BL1"]').addEventListener('click', () => {
    renderScorers('BL1');
})
document.querySelector('[data-league="PD"]').addEventListener('click', () => {
    renderScorers('PD');
})
document.querySelector('[data-league="FL1"]').addEventListener('click', () => {
    renderScorers('FL1');
})


