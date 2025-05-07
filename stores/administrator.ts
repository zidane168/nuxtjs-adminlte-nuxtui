import { defineStore } from 'pinia'

import type { Administrator  } from '~/ultis/types/Administrator'; 

export interface AdministratorStoreState {
    administrators: Administrator[];
    currentAdministrator: Administrator | null;
    total: number;
    pageSize: number;
    currentPage: number;
  }

export const useAdministratorStore = defineStore('administratorStore', {
    state: (): AdministratorStoreState => ({
        administrators: [],
        currentAdministrator:null,
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
                // alert(err)
            }
        },

        async getAdminById(id: number) { 
            try {  
                console.log ( '---------')
                console.log(id)
                console.log ( '---------')
                const response = await fetch('https://dummyjson.com/users/' + id)
               
                if (response.status != 200) {
                    alert(response.status)
                    return;
                }
                    
                const data = await response.json()
                this.currentAdministrator = data  
                console.log(this.currentAdministrator)

            } catch (err) {
                // alert(err)
            }
        },

        async updateAdmin(id: number, body: Administrator) { 
            const response = await fetch('https://dummyjson.com/users/2', {
                method: 'PUT', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(    body   )
            })
            
            if (response.status == 200) {
                return true
            }
            return false
        }
    }
})