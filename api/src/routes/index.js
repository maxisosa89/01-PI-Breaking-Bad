const { Router } = require('express');
const axios = require('axios');
const { Character, Occupation } = require('../db');

const router = Router();

const getApiInfo = async () => {
    const apiUrl = await axios.get('https://www.breakingbadapi.com/api/characters')
    const apiInfo = await apiUrl.data.map (el => {
        const { char_id, name, nickname, birthday, status, img, occupation } = el;
        return {
            char_id,
            name,
            nickname,
            birthday,
            status,
            img,
            occupation
        }
    })
    return apiInfo;
}

const getDbInfo = async () => {
    return await Character.findAll({
        include: {
            model: Occupation,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
}

const getAllCharacters = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = dbInfo.concat(apiInfo);
    return infoTotal;
}

router.get('/characters', async (req, res) => {
    const name = req.query.name;
    const charactersTotal = await getAllCharacters();
    if (name) {
        const characterName = await charactersTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        characterName.length ?
        res.send(characterName) : 
        res.status(404).send("Character not found")
    } else {
        res.send(charactersTotal)
    }
})

router.get('/occupations', async (req, res) => {
    let occupationsDb = await Occupation.findAll()
    if (occupationsDb.length===0){
        const charactersTotal = await getAllCharacters();
        const aux = await charactersTotal.map(el => el.occupation);
        let occupationsApi = [];
        for (let i = 0; i < aux.length; i++){
            for (let j = 0; j < aux[i].length; j++){
                occupationsApi.push(aux[i][j]);
            }
        }
        occupationsApi = occupationsApi.filter((el, i)=>{
            return occupationsApi.indexOf(el) === i;
        })
        occupationsApi.forEach(el => {
            Occupation.findOrCreate({
                where: {name: el}
            })
        });
        occupationsDb = await Occupation.findAll()
    }
    res.send(occupationsDb)
})

router.get('/character/:id', async (req, res) => {
    const id = req.params.id;
    if(!isNaN(id)){
        const characterIdUrl = await axios.get('https://www.breakingbadapi.com/api/characters/' + id);
        const characterIdInfo = await characterIdUrl.data.map (el => {
            const { char_id, name, nickname, birthday, status, img, occupation } = el;
            return {
                char_id,
                name,
                nickname,
                birthday,
                status,
                img,
                occupation
            }
        })
        res.send(characterIdInfo)
    } else {
        const characterIdBd = await Character.findByPk(id, {
            include: 
            {
            model: Occupation,
            attributes: ["name"],
            through: {
                attributes: [],
            },
            }});
        res.send(characterIdBd);
    } 
})

router.post('/character', async (req, res) => {
    const { name, nickname, birthday, status, img, db, occupations } = req.body;
    let charCreate = await Character.create({ name, nickname, birthday, status, img, db });
    let occCreate = await Occupation.findAll({
        where: {name: occupations}
    })
    charCreate.addOccupation(occCreate);
    res.json('Recipe created');
})

module.exports = router;
