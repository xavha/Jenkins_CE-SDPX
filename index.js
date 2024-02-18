const express = require('express')
const app = express()

app.get('/getcode', (req, res) => {
  res.send('hello whawha again na')
})

app.get('/plus/:num1/:num2', (req,res) => {
    try {
        const n1 = parseFloat(req.params.num1);
        const n2 = parseFloat(req.params.num2);

        if (n1 != req.params.num1 || n2 != req.params.num2) {
            throw new Error('Bad Request: Invalid number input.')
        }

        res.send(`${n2 + n1}`)     
    } catch (error) {
        // console.error(error.message)
        if (error.message.includes('Bad Request')) {
            res.status(400).send('Bad Request: Invalid number input.');
        } 
        else if (error.message.includes('URIError')) {
            res.status(400).send('Bad Request: Invalid number input.');
        }
        else {
            res.status(500).send('Internal Server Error: An unexpected error occurred.');
        }
    }
})

app.listen(3000, () => {
    console.log("Server run 3000")
})

module.exports = app