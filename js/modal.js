export default{
    template:`<div class="modal panel">
        <div class="modal-header">
            <span class="modal-title" v-if="isNew">新增產品</span>
            <span class="modal-title" v-else>編輯產品</span>
            <span class="close float-right" @click="closeModal">X</span>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-sm-4">
                    <aside>
                        <div class="form-team">
                            <label for="imgUrl">輸入圖片網址</label>
                            <input type="text" id="imgUrl" placeholder="請輸入圖片連結" v-model="tempData.imageUrl[0]">
                        </div>
                        <div class="form-team">
                            <img :src="tempData.imageUrl">
                        </div>
                    </aside>
                </div>
                <div class="col-sm-8">
                    <main>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-team">
                                    <label for="newTitle">標題</label>
                                    <input type="text" id="newTitle" placeholder="請輸入標題"
                                        v-model="tempData.title">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-team">
                                    <label for="newCate">分類</label>
                                    <input type="text" id="newCate" placeholder="請輸入分類"
                                        v-model="tempData.category">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-team">
                                    <label for="newUnit">單位</label>
                                    <input type="text" id="newUnit" placeholder="請輸入單位" v-model="tempData.unit">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-team">
                                    <label for="newOriginPrice">原價</label>
                                    <input type="text" id="newOriginPrice" placeholder="請輸入原價"
                                        v-model="tempData.origin_price">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-team">
                                    <label for="newPrice">售價</label>
                                    <input type="text" id="newPrice" placeholder="請輸入售價"
                                        v-model="tempData.price">
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-team">
                                    <label for="newDescription">產品描述</label>
                                    <textarea type="text" id="newDescription" placeholder="請輸入產品描述"
                                        v-model="tempData.description"></textarea>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-team">
                                    <label for="newContent">說明內容</label>
                                    <textarea type="text" id="newContent" placeholder="請輸入說明內容"
                                        v-model="tempData.content"></textarea>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-team">
                                    <div class="ckbox">
                                        <input type="checkbox" id="newActivate" v-model="tempData.enabled">
                                        <label for="newActivate">是否啟用</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn" id="cancel" @click="closeModal">取消</button>
            <button class="btn" id="confirm" @click="uploadData">確認</button>
        </div>
    </div>`,
    // data(){
    //     return {
    //         tempData: {
    //             enabled: false, 
    //             imageUrl: []
    //         }
    //     }
    // },
    props: ['tempData','api','isNew','closeModal'],
    methods:{
        uploadData(){
            this.isLoading = true;
            let url = `https://course-ec-api.hexschool.io/api/${this.api.uuid}/admin/ec/product`;
            let httpMethod = 'post';
            if(!this.isNew){
                url = `https://course-ec-api.hexschool.io/api/${this.api.uuid}/admin/ec/product/${this.tempData.id}`;
                httpMethod = 'patch';
            }

            // const url = `${this.api.path}${this.api.uuid}/admin/ec/product/${this.tempData.id}`;
            axios[httpMethod](url, this.tempData)
                .then(()=>{
                    this.isLoading = false;
                    // console.log(res)
                    this.$emit('update')
                })
                .catch((err)=>{
                    console.log(err)
                })
        },
        openNewPanel(){},
        openEditPanel(){},
        // closeModal(){},
    }
}