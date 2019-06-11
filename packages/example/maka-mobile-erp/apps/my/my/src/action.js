
import { actionMixin, fetch, getAction, navigate } from 'maka'

console.log(getAction('numberHelper'))

@actionMixin('base', 'toast', 'numberHelper')
export default class action {
    constructor(option) {
        Object.assign(this, option.mixins)
    }

    signOut = () => {
        fetch.clearAccessToken()
        navigate.redirect('/sign-in')
    }

    setting = () => {
        this.toast.info('你就告诉我啥不能做吧 !!!', 1)
    }

    setperson = async () => { 
        var openPage = this.base.context.get('openPage')
        if(!openPage) return

        const ret = await openPage('个人信息', 'set-person')
    }
}
