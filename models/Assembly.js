const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssemblySchema = mongoose.Schema({ 
    name:{ // 의원 이름
        type: String,
        minlength: 10
    },
    party: { // 소속 정당
        type: String,
        minlength: 10
    },
    phone: { // 연락처
        type: String
    },
    tenure: { // 약력
        type: String
    },
    mail: { // 이메일
        type: String
    },
})

const Assembly = mongoose.model('Assembly', AssemblySchema)

module.exports = { Assembly }
