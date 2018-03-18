const express = require("express");
const router = express.Router();
const handler = require("../utils/ControllerHandler");
const requireAll = require("require-all");
const chisquare = require("../methods/chisquare");
const kolmogorov = require("../methods/kolmogorov");
const poker = require("../methods/poker");
const run = require("../methods/runTest");
const half = require("../methods/half");
const runBelowHalf = require("../methods/runBelowHalf");
const gap = require("../methods/gap");
/**
 * @swagger
 * /methods/chisquare:
 *   post:
 *     description: chiSquare Method
 *     tags:
 *      - Methods
 *     produces:
 *      - application/json
 *     parameters:
 *       - $ref: "#/parameters/significancy"
 *       - $ref: "#/parameters/numbers"
 *       - $ref: "#/parameters/numbersFile"
 *     responses:
 *       200:
 *         description: result
 */
router.post("/chisquare", handler(chisquare));

/**
 * @swagger
 * /methods/kolmogorov:
 *   post:
 *     description: kolmogorov Method
 *     tags:
 *      - Methods
 *     produces:
 *      - application/json
 *     parameters:
 *       - $ref: "#/parameters/significancy"
 *       - $ref: "#/parameters/numbers"
 *       - $ref: "#/parameters/numbersFile"
 *     responses:
 *       200:
 *         description: result
 */
router.post("/kolmogorov", handler(kolmogorov));

/**
 * @swagger
 * /methods/poker:
 *   post:
 *     description: The Poker Method
 *     tags:
 *      - Methods
 *     produces:
 *      - application/json
 *     parameters:
 *       - $ref: "#/parameters/significancy"
 *       - $ref: "#/parameters/numbers"
 *       - $ref: "#/parameters/numbersFile"
 *     responses:
 *       200:
 *         description: result
 */
router.post("/poker", handler(poker));

/**
 * @swagger
 * /methods/run:
 *   post:
 *     description: + - normal method
 *     tags:
 *      - Methods
 *     produces:
 *      - application/json
 *     parameters:
 *       - $ref: "#/parameters/significancy"
 *       - $ref: "#/parameters/numbers"
 *       - $ref: "#/parameters/numbersFile"
 *     responses:
 *       200:
 *         description: result
 */
router.post("/run", handler(run));

/**
 * @swagger
 * /methods/runBelowHalf:
 *   post:
 *     description: + - method below half !
 *     tags:
 *      - Methods
 *     produces:
 *      - application/json
 *     parameters:
 *       - $ref: "#/parameters/significancy"
 *       - $ref: "#/parameters/numbers"
 *       - $ref: "#/parameters/numbersFile"
 *     responses:
 *       200:
 *         description: result
 */
router.post("/runBelowHalf", handler(runBelowHalf));

/**
 * @swagger
 * /methods/gaps:
 *   post:
 *     description: Gap method !
 *     tags:
 *      - Methods
 *     produces:
 *      - application/json
 *     parameters:
 *       - $ref: "#/parameters/significancy"
 *       - $ref: "#/parameters/numbers"
 *       - $ref: "#/parameters/numbersFile"
 *     responses:
 *       200:
 *         description: result
 */
router.post("/gaps", handler(gap));

router.post("/half", handler(half));

module.exports = router;
