import pagination from './pagination.js';
import modal from './modal.js';

Vue.component('pagination', pagination);
Vue.component('modal', modal);
Vue.component('loading', VueLoading);

new Vue({
    el: '#app',
    data: {
        prods: [],
        pagination: {},
        openNewPanel: false,
        openEditPanel: false,
        openConfirm: false,
        tempData: { enabled: false, imageUrl: [] },
        api: {
            uuid: 'bba8c8a3-a5f2-4a81-91ef-9273532ebb26',
            path: 'https://course-ec-api.hexschool.io/api/'
        },
        token: '',
        isNew: '',
        loadingBtn: '',
        isLoading: false
    },
    methods: {
        signout(){
            document.cookie = `tokenName=; expires=; path=/`;
            window.location="week4_login.html";
        },
        openModal(status, prod) {
            switch (status) {
                case 'new':
                    this.tempData = { enabled: false, imageUrl: [] }
                    this.openNewPanel = true
                    this.isNew = true
                    break;
                case 'edit':
                    this.loadingBtn = prod.id;
                    const url = `${this.api.path}${this.api.uuid}/admin/ec/product/${prod.id}`;
                    console.log(prod);
                    this.isLoading = true;
                    axios.get(url)
                        .then(res=>{
                            this.isLoading = false;
                            // console.log(res)
                            this.tempData = res.data.data;
                            this.openEditPanel = true;
                            this.isNew = false;
                            this.loadingBtn = '';
                        })
                    break;
                case 'delete':
                    this.openConfirm = true
                    this.tempData = JSON.parse(JSON.stringify(prod))
                    break;
            }
        },
        closeModal() {
            this.openNewPanel = false,
            this.openEditPanel = false,
            this.openConfirm = false,
            this.tempData = { enabled: false, imageUrl: [] }
        },
        removeData() {
            const url = `https://course-ec-api.hexschool.io/api/${this.api.uuid}/admin/ec/product/${this.tempData.id}`;

            //預設帶入 token
            axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;

            this.isLoading = true;
            axios.delete(url)
                .then(() => {
                    this.isLoading = false;
                    // $('#delProductModal').modal('hide');
                    this.closeModal()
                    // this.$emit('update');
                    this.getProds()
                })
        },
        getProds(num=1) {
            // if(!num){num=1}
            console.log(num)
            const url = `${this.api.path}${this.api.uuid}/admin/ec/products?page=${num}`;
            this.isLoading = true;
            axios.get(url)
                .then(res => {
                    this.isLoading = false;
                    console.log(res);
                    this.prods = res.data.data;
                    this.pagination = res.data.meta.pagination;

                    // if(this.tempData.id){
                        this.tempData = { enabled: false, imageUrl: [] };
                        this.openNewPanel = false;
                        this.openEditPanel = false;
                    // }
                })
        }
    },
    created() {
        // token放置在created可以全檔案套用
        this.token = document.cookie.replace(/(?:(?:^|.*;\s*)tokenName\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
        this.getProds()
    }
})