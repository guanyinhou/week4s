export default{
    template: `<nav aria-label="Page navigation example">
        <ul class="pagination d-flex justify-content-end">
            <li class="page-item" :class="{'disabled':pages.current_page===1}">
                <a class="page-link" href="#" aria-label="Previous" @click.prevent="updatePage(pages.current_page - 1)">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item" 
            v-for="i in pages.total_pages" 
            :key="i" 
            :class="{active: pages.current_page===i}">
                <a class="page-link" href="#" @click.prevent="updatePage(i)">{{i}}</a>
            </li>
            <li class="page-item" :class="{'disabled':pages.current_page===pages.total_pages}">
                <a class="page-link" href="#" aria-label="Next" @click.prevent="updatePage(pages.current_page + 1)">
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