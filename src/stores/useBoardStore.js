import { defineStore } from "pinia";
import axios from "axios";

export const useBoardStore = defineStore("Board", {
    state: () => ({
        boardList: [],
        page: 0,
        size: 3,
        totalElements: 0,
        totalPages: 0,
        hasNext: false,
        hasPrevious: false
    }),

    actions: {
        async fetchBoardList(page = 0, size = 3) { 
            try {
                const response = await axios.get("/api/board/list", {
                    params: { page, size }
                });
                console.log("백엔드에서 가져온 데이터:", response.data);

                this.boardList = response.data.boardList;
                this.page = response.data.page;
                this.size = response.data.size;
                this.totalElements = response.data.totalElements;
                this.totalPages = response.data.totalPages;
                this.hasNext = response.data.hasNext;
                this.hasPrevious = response.data.hasPrevious;
                
                return response.data;
            } catch (error) {
                console.error("게시글 목록 불러오기 실패:", error);
                throw error;
            }
        }
    }
});
