import { defineStore } from 'pinia'

export const useAdministratorStore = defineStore('administratorStore', {
    state: () => ({
        administrators: [],
        total: 0,
        pageSize: 10,
        currentPage: 1, 
    }),
    actions: {
        async fetchPagination(page = 1) {
            // const response = await axios.get(`api/users/fetchUsers?page=${page}&limit=${this.pageSize}`, {
            //     headers: {
            //       Authorization: `Bearer ${this.token}`, // Pass the token in the Authorization header
            //     },
            // });  

            try {
                const skip = (page - 1) * this.pageSize
                const response = await fetch('https://dummyjson.com/users?limit=' + this.pageSize + '&skip=' +  skip)

                if (response.status != 200) {
                    alert(response.status)
                    return;
                }
                    
                const data = await response.json()
                this.administrators = data.users
                this.total = data.total 
                this.currentPage = page  

            } catch (err) {
                alert(err.getMessages())
            }
        }
    }
})