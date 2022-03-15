const express = require('express');
const app = express();
const path = require('path');
const {Game, Company, db} = require('./db')
const faker = require ("faker")

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

// app.get('/api/games/:id', async(req, res, next)=>{
//     try{
//         res.send(await Game.findByPk(req.params.id, {
//             include: Company
//         }))
//     }catch(err){
//         next(err)
//     }
// })

app.delete('/api/games/:id', async(req, res, next)=>{
    try{
        const destroyed = await Game.findByPk(req.params.id)
        await destroyed.destroy()
        res.sendStatus(204)
    }catch(err){
        next(err)
    }
})

app.post('/api/games', async(req, res, next)=>{
    try{
        await randomGame()
        res.send(await Game.findAll({
            include: Company
        }))
    }catch(err){
        next(err)
    }
})

app.get('/api/games', async(req, res, next)=>{
    try{
        const games = await Game.findAll({
            include: Company
        })
        res.send(games)
    }catch(err){
        next(err)
    }
})


const possibleGenres = ['rpg', 'rts', 'moba', 'fps']

const randomName = () => faker.random.words()


const randomGenre = ()=> possibleGenres[Math.floor(Math.random()*4)]


const randomCompanyId = ()=> Math.floor(Math.random()*5)+1


const randomGame = ()=> Game.create({name:randomName(), genre:randomGenre(), companyId: randomCompanyId()})


const setUp = async()=>{
    try{
        await db.sync({force:true})
        const riotGames = await Company.create({name: 'riot games'})
        const blizzard = await Company.create({name: 'blizzard'})
        const electronicArts = await Company.create({name: 'electronic arts'})
        const activision = await Company.create({name: 'activision'})
        const valve = await Company.create({name: 'valve'})
        await Game.create({name:'diablo', genre: "rpg", companyId: blizzard.id})
        await Game.create({name:'world of warcraft', genre: "rpg", companyId: blizzard.id})
        await Game.create({name:'command & conquer', genre: "rts", companyId: electronicArts.id})
        await Game.create({name:'starcraft', genre: "rts", companyId: blizzard.id})
        await Game.create({name:'league of legends', genre: "moba", companyId: riotGames.id})
        await Game.create({name:'valorant', genre: "fps", companyId: riotGames.id})
        await Game.create({name:'dota', genre: "moba", companyId: valve.id})
        await Game.create({name:'call of duty', genre: "fps", companyId: activision.id})
        await Game.create({name:'counter strike', genre: "fps", companyId: valve.id})
        const port = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`listening on port ${port}`));
    }catch(ex){
        console.log(`there was an error syncing the DB`)
    }
}

setUp()
