const express = require('express');
//import express from 'express';
const bilola = express()
bilola.get('/',(v)=>{
    return "a"
})
bilola.listen(3000, () => {
    console.log('biluga ta ouvindo')
})
