import { message } from 'antd'
import { loginout } from '../../../stores/user'
export const menuList = [
    {
        key: '1',
        label: '个人设置',
    },
    {
        key: '2',
        label: '退出登陆',
    },
]

export const useMenu = () => {
    interface Command {
        execute(): void
    }
    class LogoutCommand implements Command {
        constructor(
            private dispatch: any,
            private navigate: any,
        ) {
            this.dispatch = dispatch
            this.navigate = navigate
        }

        execute() {
            this.dispatch(loginout())
            message.success('退出成功')
            setTimeout(() => {
                this.navigate('/gxt/login')
            }, 1000)
        }
    }

    class ProfileCommand implements Command {
        constructor(private navigate: any) {
            this.navigate = navigate
        }

        execute() {
            this.navigate('/gxt/profile')
        }
    }

    const commandMap = {
        '1': (navigate: any) => new ProfileCommand(navigate),
        '2': (dispatch: any, navigate: any) =>
            new LogoutCommand(dispatch, navigate),
    }
    return {
        LogoutCommand,
        ProfileCommand,
        commandMap,
    }
}
