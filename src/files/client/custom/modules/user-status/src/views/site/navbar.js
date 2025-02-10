import NavbarSiteView from 'views/site/navbar';

class CustomNavbarSiteView extends NavbarSiteView {

    constructor(options) {
        super(options);
        this.statusField = 'usStatus';
    }

    setup() {
        super.setup();
        this.processMenuDataList();
        this.listenTo(this.getUser(), `sync`, () => {
            this.processMenuDataList();
            this.reRender();
        });
    }

    processMenuDataList() {
        const item = this.menuDataList.find(it => it.name === this.statusField);

        if (!item) return;

        item.html = this.buildStatusHtml();
    }

    buildStatusHtml() {
        return $('<span>')
            .append(
                $('<span>').text(this.getLanguage().translate(this.statusField, 'fields', 'User')),
                ' ',
                $('<span>').addClass('text-muted middle-dot'),
                ' ',
                this.buildStatusBlock()
            )
            .get(0).outerHTML;
    }

    buildStatusBlock() {
        const statusTranslated = this.getLanguage().translateOption(this.getUser().get(this.statusField), this.statusField, 'User');

        return $('<span>')
            .prop('title', statusTranslated)
            .text(statusTranslated)
            .addClass(this.getStatusClass());
    }

    getStatusStyle() {
        return this.getMetadata().get(['entityDefs', 'User', 'fields', this.statusField, 'style', this.getUser().get(this.statusField)], 'default');
    }

    getStatusClass() {
        const user = this.getUser();
        const statusStyle = this.getStatusStyle();
        if (!user.getFieldParam(this.statusField, 'displayAsLabel')) {
            return `text-${statusStyle}`;
        }

        const baseClass = `label label-md label-${statusStyle}`;
        return user.getFieldParam(this.statusField, 'labelType') === 'state' ?
            `${baseClass} label-state` : baseClass;
    }
}

export default CustomNavbarSiteView;
