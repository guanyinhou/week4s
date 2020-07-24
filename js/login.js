Vue.component('loading',VueLoading);

// uuid
const uuid = 'bba8c8a3-a5f2-4a81-91ef-9273532ebb26';
const apiPath = 'https://course-ec-api.hexschool.io/api/';
new Vue({
    el: '#app',
    data(){
        return {
            user:{
                email:"",
                password:""
            },
            token:"",
            isLoading: false
        }
    },
    methods:{
        signin(){
            let vm = this;
            const api = `${apiPath}auth/login`;
            vm.isLoading = true;
            axios.post(api, vm.user).then((res)=>{
                console.log(res)
                const token = res.data.token;
                const expired = res.data.expired;

                document.cookie = `tokenName=${token}; expires=${new Date(expired * 1000)}; path=/`;
                window.location="week4_products.html";
            }).catch((err)=>{
                console.log(err)
            })
        },
    }
})