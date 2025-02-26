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
        hasPrevious: false,
        board: {
            title: "",
            content: "",
            writer: "",
            comments: []
        }
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
        },
        async fetchBoardDetail(boardIdx) {
            try {
                const response = await axios.get(`/api/board/read/${boardIdx}`);
                console.log("게시글 상세 불러오기 성공:", response.data);
                this.board = response.data;
            } catch (error) {
                console.error("게시글 상세 불러오기 실패:", error);
                throw error;
            }
        },

        // 댓글 작성
        async registerComment(boardIdx, commentData) {
            try {
                const response = await axios.post(`/api/comment/register/${boardIdx}`, commentData);
                console.log("댓글 작성 성공:", response.data);
                
                // 댓글 목록 새로고침
                this.fetchBoardDetail(boardIdx);
            } catch (error) {
                console.error("댓글 작성 실패:", error);
                throw error;
            }
        },
        async registerBoard(boardData) {
            try {
                const response = await axios.post("/api/board/register", boardData);
                console.log("게시글 등록 성공:", response.data);
                return response.data;
            } catch (error) {
                console.error("게시글 등록 실패:", error);
                throw error;
            }
        }
    }
});
