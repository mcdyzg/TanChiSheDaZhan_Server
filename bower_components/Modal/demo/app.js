var ModalFactory = require('../src/modal');

var btnStyle = {
    margin: '1em auto',
    padding: '1em 2em',
    outline: 'none',
    fontSize: 16,
    fontWeight: '600',
    background: '#C94E50',
    color: '#FFFFFF',
    border: 'none'
};

var containerStyle = {
    padding: '2em',
    textAlign: 'center'
};

var APP = React.createClass({

    toggleDialog: function(ref){

        return function(){
            this.refs[ref].toggle();
        }.bind(this)
    },

    getContent: function(ref){
        return (
            <div style={containerStyle}>
                <h2 style={{margin: 0, color: '#C94E50', fontWeight: 400}}></h2>
                <button style={btnStyle} onClick={this.toggleDialog(ref)}>关闭</button>
            </div>
        );
    },

    getTiggerAndModal: function(ref, index){
        var Modal = ModalFactory[ref];
        return  (
            <div key={'modal_'+index}>
                <button style={btnStyle} onClick={this.toggleDialog(ref)}>Open {ref}</button>
                <Modal ref={ref} className="modal">{this.getContent(ref)}</Modal>
            </div>
        );
    },

    render: function() {
        var self = this;
        return (
            <div>
                {['DropModal','LeftModal','ScaleModal','WaveModal'].map(function(name, ind){
                    return self.getTiggerAndModal(name, ind);
                })}
            </div>
        );
    }
});
ReactDOM.render(<APP/>, document.getElementById('AppContainer'));
