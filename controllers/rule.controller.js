const Rule = require('../models/Rule')
const catchAsync = require('../helpers/catchAsync');


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
    findByNbPlayer
};