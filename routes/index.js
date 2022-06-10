const express = require("express");
const mysql = require("mysql");

const conn = mysql.createConnection({
  user: 'root',
  database: 'stealth',
  host: 'localhost',
  password: 'sansogknnamu0203'
});
conn.connect();

const router = express.Router();

router
.get('/', (req, res) => {
    res.render('index');
})
.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = `SELECT * FROM users WHERE userid='${username}' AND password='${password}'`;
  conn.query(sql, (err, data) => {
    if(err) return res.status(500).json({err});
    if(data.length == 0) return res.status(400).json({ msg: '로그인 실패!' });
    
    res.json({
      msg: '로그인에 성공했어요 !',
      flag: data[0].userid == 'admin' ? '디미고 트러스트/스텔스 짱!' : false,
      username: data[0].name
    });
  });
})

module.exports = router;
