<div class="margin-bottom">
    <p>{{translate 'usSetStatus' scope='User' category='messages'}}</p>
</div>
<div>
    {{#each statusDataList}}
    <div class="margin-bottom">
        <div>
            <button
                class="action btn btn-{{style}} btn-x-wide"
                type="button"
                data-action="setStatus"
                data-status="{{name}}"
            >
                {{label}}
            </button>
            {{#if selected}}<span class="check-icon fas fa-check" style="vertical-align: middle; margin: 0 10px;"></span>{{/if}}
        </div>
    </div>
    {{/each}}
</div>
