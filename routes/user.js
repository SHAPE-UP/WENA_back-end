const express = require('express');
const router = express.Router();
const { User } = require('../models/User');

// 회원가입 라우터
router.post('/register', (req, res) => {

    const user = new User(req.body) 
  
    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
  })
  
  router.post('/login', (req, res) => {
    //로그인 라우터
    User.findOne({ usermail: req.body.usermail }, (err, user) => {
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: "메일에 해당하는 유저가 없습니다."
        })
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
    
          if(!isMatch) return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})

          res.status(200).json({ loginSuccess: true, user })
    
      })
    })
    })
  // 사용자 정보 보기
router.get('/:userID', (req, res) => {
  const userID = req.params.userID
  User.findOne({_id: userID})
  .exec((err, user) => {
    if(err) return res.json({success:false, err})
    if(userID) return res.status(200).json({
      success: true,
      message:"유저 정보 불러오기",
      user
    })
  })
})

//로그아웃
router.get('/logout', (req, res)=>{
  
  User.findOneAndUpdate({ _id: req.user.id }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
      logout: "로그 아웃 완료",
    });
  });
})

//회원탈퇴
router.get('/secession', (req, res) => {
  User.findOne({name : req.cookies.session},(err, users) => { 
      if(!req.cookies.session || err) {  // 정보/쿠키 없거나 에러 났을 때
        res.redirect('/');
      } else {
        users.deleteOne();
        res.clearCookie('session');
        res.redirect('/'); 
      }
  })
})
  

module.exports = router;