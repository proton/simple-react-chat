const io = require('socket.io-client')
const chai = require('chai')

const expect = chai.expect
const ChatServer = require('../server/ChatServer.js')

describe('Suite of unit tests', () => {
  let socket
  let chatServer
  let server

  beforeEach((done) => {
    server = require('http').createServer()
    chatServer = new ChatServer(server)

    server.listen(9999, (error) => {
      if (error) throw error
    })

    socket = io.connect('http://localhost:9999', {
      'reconnection delay': 0,
      'reopen delay': 0,
      'force new connection': true,
    })
    socket.on('connect', () => { done() })
    socket.on('disconnect', () => { })
  })

  afterEach((done) => {
    if (socket.connected) socket.disconnect()
    server.close()
    done()
  })

  describe('Chat', () => {
    context('after connection', () => {
      it('sends user connected message', (done) => {
        socket.once('chat message', (data) => {
          expect(data).to.deep.equal({ text: 'user1 connected' })
          done()
        })
      })

      it('sends userlist', (done) => {
        socket.once('userlist updated', (data) => {
          expect(data).to.deep.equal([{ id: 1, name: 'user1' }])
          done()
        })
      })
    })
  })
})

