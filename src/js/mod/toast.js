
require('less/toast.less')

function toast(msg,time) {
    this.msg = msg
    this.time = time || 3000
    this.creatEle()
    this.showToast()
}

toast.prototype = {
    creatEle(){
        var wrapper = `<div class="toast"><span>`+this.msg+`</span></div>`
        this.$toast = $(wrapper)
    },
    showToast(){
        let app =  document.body
        let toastEle = this.$toast[0]
        app.appendChild(toastEle)
        setTimeout(()=>{
            app.removeChild(toastEle)
        },this.time)
    }
}

function Toast(msg,time){
    return new toast(msg,time)
}


module.exports.Toast = Toast