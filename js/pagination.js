export default{
    template: `<nav aria-label="Page navigation example">
        <ul class="pagination d-flex justify-content-end">
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item" v-for="i in pages.total_pages" :key="i" :class="{active: pages.current_page===i}"><a class="page-link" href="#" @click.prevent="updatePage(i)">{{i}}</a></li>
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>`,
    props: ['pages'],
    methods:{
        updatePage(num){
            // console.log(num)
            this.$emit('update', num)
        }
    }
}