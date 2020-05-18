module.exports = {
    
    extends:['./eslint/base.js',],
    parserOptions: {
        "ecmaVersion": 2019,
        "sourceType": 'module',
        "ecmaVersion": 11,
        "ecmaFeatures":{
            jsx:true
        },
    },
    env:{
        browser: true,
        node: true,
        es6: true
    }  
}