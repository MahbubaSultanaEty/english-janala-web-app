const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all").then(res => res.json()).then(json => displayLessons(json.data))
};
const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
     fetch(url).then(res => res.json()).then(jsonData=>  displayLevelWord(jsonData.data))
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    words.forEach(word => {
        console.log(word);

        const card = document.createElement("div");
        card.innerHTML = `
        <p>cat</p>
        `
        wordContainer.append(card)
    });

}

const displayLessons = (lessons) => {
    console.log(lessons);

    // 1: get the container and empty
    const levelContainer = document.getElementById("level-container")
    levelContainer.innerHTML = "";

    
    //2: get into every lesson
    for (let lesson of lessons) {
        // 3: create element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
                <button onclick="loadLevelWord(${lesson.level_no})" href="" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson -${lesson.level_no}</button>
        `;

        console.log(lesson)
        //4: append to the container 
        levelContainer.append(btnDiv)
        
    }
    
}
    
loadLessons()