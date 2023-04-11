const Card = require('../models/Card')
const Rule = require('../models/Rule')
const User = require('../models/User')
const catchAsync = require('../helpers/catchAsync');


/**
 * Description placeholder
 * 
 * Permet d'avoir la liste des cartes du jeu
 * 
 * @date 3/16/2023 - 6:43:38 PM
 * @author Astyanax Pitelet
 *
 * @type {*}
 */
const cartes = catchAsync(async (req, res) => {
    try {
        const cards = await Card.find()
        res.send(cards)
    } catch(err) {

    }
})


/**
 * 
 * Permet d'avoir une liste de carte par identifiant donnée
 * 
 * @date 3/21/2023 - 11:48:05 AM
 * @author Astyanax Pitelet
 *
 * @type {*}
 */
const getCardById = catchAsync(async(req, res) => {
    try {
        const card = await Card.find({
            _id: req.body.idCard
        })
        res.send(card)
    } catch(err) {}
})

/**
 * Description : 
 * 
 * Permet d'avoir une rule par le nombre de joueur 
 * présent dans un lobby
 * 
 * @date 3/16/2023 - 6:19:24 PM
 * @author Astyanax Pitelet
 *
 * @type {*}
 */
const findByNbPlayer = catchAsync(async (req, res) => {
    try {
        const rule = await Rule.find({
            nbPlayer: req.body.nbPlayer
        })
        res.send(rule)
    } catch(err) {
        res.json({
            error: "Une erreur est survenue lors du chargement de la partie"
        })
    }
})



/**
 * Description placeholder
 * 
 * Permet de récupérer un utilisateur par son adresse mail
 * 
 * @date 4/7/2023 - 3:32:33 PM
 * @author Astyanax Pitelet
 *
 * @type {*}
 */
const findUserByMail = catchAsync(async (req, res) => {
    try {
        const user = await User.findOne({
            mail: req.body.mail
        })
        res.send(user.userName)
    } catch(err) {

    }
})

module.exports = {
    cartes,
    findByNbPlayer,
    getCardById,
    findUserByMail
};