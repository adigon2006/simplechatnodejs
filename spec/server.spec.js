var request = require('request')

describe('calc',() => {
    it('should multiple',() => {
        expect(2*2).toBe(4)
    })
})

describe('get messages',  () =>{

    it('should return 200 ok', (done) => {
    request.get('http://localhost:3022/messages',(err,res) => {
   console.log(res.body)
   expect(res.statusCode).toBe(200)
   done()
    })
    })

    it('should return list not empy', (done) => {
        request.get('http://localhost:3022/messages',(err,res) => {
       console.log(res.body)
       expect(JSON.parse(res.body).length).toBeGreaterThan(0)
       done()
        })
        })
})

describe('get message for a user', () => {
    it('should return 200 ok', (done) => {
        request.get('http://localhost:3022/messages/tim',(err,res) => {
       console.log(res.body)
       expect(res.statusCode).toBe(200)
       done()
        })
        })
        
     it('name should be tim', (done) =>{
        request.get('http://localhost:3022/messages/tim',(err,res) => {
            console.log(res.body)
            expect(JSON.parse(res.body)[0].name).toBe('tim')
            done()
             })
     })   
})