import ModalView from 'views/modal';

class SetStatusModalView extends ModalView {

    constructor(options) {
        super(options);
        this.backdrop = true;
        this.entityType = 'User';
        this.statusField = 'usStatus';
        this.template = 'user-status:user/modals/set-status';
    }

    setup() {
        super.setup();
        this.setupHeader();
        this.setupStatusDataList();
    }

    setupHeader() {
        const userName = this.getUser().get('name');
        const entityLabel = this.translate(this.entityType, 'scopeNames');
        const statusLabel = this.translate(this.statusField, 'fields', this.entityType);

        this.$header = $(`
            <span>
                <span>${entityLabel}</span>
                <span class="chevron-right"></span>
                <span>${userName}</span>
                <span class="chevron-right"></span>
                <span>${statusLabel}</span>
            </span>
        `);
    }

    setupStatusDataList() {
        let statusList = this.getMetadata().get(['entityDefs', this.entityType, 'fields', this.statusField, 'options'], []);

        this.statusDataList = statusList.map(item => {
            return {
                name: item,
                style: this.getMetadata().get(['entityDefs', this.entityType, 'fields', this.statusField, 'style', item], 'default'),
                label: this.getLanguage().translateOption(item, this.statusField, this.entityType),
                selected: this.getUser().get(this.statusField) === item
            }
        });
    }

    data() {
        return {
            ...super.data(),
            statusDataList: this.statusDataList,
        }
    }

    actionSetStatus(data) {
        if (data?.status) {
            this.trigger('set-status', data.status);
        }
        this.close();
    }
}

export default SetStatusModalView;
