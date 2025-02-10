import ActionHandler from 'action-handler';

class NavbarStatusHandler extends ActionHandler {

    constructor(options) {
        super(options);
    }

    // noinspection JSUnusedGlobalSymbols
    async changeStatus() {
        Espo.Ui.notify(' ... ');

        try {
            const view = await this.view.createView('us-set-status-dialog', 'user-status:views/user/modals/set-status', {});
            await view.render();
            Espo.Ui.notify(false);

            this.view.listenToOnce(view, 'set-status', async (status) => {
                await this.updateUserStatus(status);
            });
        } catch (error) {
            console.error('Error opening status modal:', error);
            Espo.Ui.error(this.view.translate('Error'));
        }
    }

    async updateUserStatus(status) {
        Espo.Ui.notify(' ... ');

        try {
            const user = this.view.getUser();
            user.set('usStatus', status);
            await user.save();

            const translatedStatus = this.view.getLanguage().translateOption(status, 'usStatus', 'User');
            const successMessage = this.view.translate('usNewStatusSet', 'messages', 'User')
                .replace('{status}', translatedStatus);

            Espo.Ui.success(successMessage);
        } catch (error) {
            console.error('Error updating user status:', error);
            Espo.Ui.error(this.view.translate('Error'));
        }
    }
}

export default NavbarStatusHandler;
