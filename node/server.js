const express           = require("express")
const express_graphql   = require("express-graphql")
const { buildSchema }   = require("graphql")
const cors              = require("cors")

let schema = buildSchema(`
    type Query {
        game (id: Int!): Game
        games: [Game]
    },

    type Game {
        id: Int
        title: String
        platform: String
    }
`)

let gamesData = [
    {
        id: 0,
        title: "First Game",
        platform: "PC"
    },
    {
        id: 1,
        title: "Second Game",
        platform: "N64"
    }
]

let getGame = args => gamesData.filter(g => g.id === args.id)[0]

let getGames = () => gamesData

let app = express()

app.use(cors())

app.use("/graphql", express_graphql({
    schema,
    rootValue: {
        game: getGame,
        games: getGames
    },
    graphiql: true
}))

app.listen(4000, console.log("Server running at port 4000"))