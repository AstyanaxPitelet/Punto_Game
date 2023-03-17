const Card = require('../models/Card')
const Rule = require('../models/Rule')
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
 * Description placeholder
 * @date 3/17/2023 - 10:19:44 AM
 * @author Astyanax Pitelet
 *
 * @type {*}
 */
const cardByColor = catchAsync(async (req, res) => {
    try {
        const cards = await Card.find({
            color: { $in: req.body.color},
        })
        res.send(cards)
    } catch(err) {

    }
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
        const rule = await Rule.findOne({
            nbPlayer: req.body.nbPlayer
        })
        res.send(rule)
    } catch(err) {
        res.json({
            error: "Une erreur est survenue lors du chargement de la partie"
        })
    }
})

module.exports = {
    cartes,
    findByNbPlayer,
    cardByColor
};