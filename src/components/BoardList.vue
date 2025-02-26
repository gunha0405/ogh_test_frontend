<template>
    <div class="board-list">
        <h2>게시글 목록</h2>

        <!-- 페이지네이션 컨트롤 -->
        <div class="pagination">
            <button @click="prevPage" :disabled="!boardStore.hasPrevious">이전</button>
            <span>페이지 {{ boardStore.page + 1 }} / {{ boardStore.totalPages }}</span>
            <button @click="nextPage" :disabled="!boardStore.hasNext">다음</button>
        </div>
        <div class="button-area">
            <router-link to="/board/register">
                <button>글쓰기</button>
            </router-link>
        </div>
        <!-- 게시글 리스트 테이블 -->
        <table>
            <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>댓글 수</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="board in boardStore.boardList" :key="board.idx" @click="goToBoard(board.idx)" style="cursor: pointer;">
                    <td>{{ board.idx }}</td>
                    <td>
                        <router-link :to="`/board/read/${board.idx}`">{{ board.title }}</router-link>
                    </td>
                    <td>{{ board.writer }}</td>
                    <td>{{ board.commentCount }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { onMounted } from "vue";
import { useBoardStore } from "../stores/useBoardStore";
import { useRouter } from "vue-router";

export default {
    setup() {
        const boardStore = useBoardStore();

        // 이전 페이지 요청
        const prevPage = async () => {
            if (boardStore.hasPrevious) {
                await boardStore.fetchBoardList(boardStore.page - 1, boardStore.size);
            }
        };

        // 다음 페이지 요청
        const nextPage = async () => {
            if (boardStore.hasNext) {
                await boardStore.fetchBoardList(boardStore.page + 1, boardStore.size);
            }
        };

        // 초기 데이터 로딩 (첫 페이지 0부터 시작)
        onMounted(() => {
            boardStore.fetchBoardList(0, 3);
        });

        const router = useRouter();

        const goToBoard = (boardIdx) => {
            router.push(`/board/read/${boardIdx}`);
        };

        return {
            boardStore,
            prevPage,
            nextPage,
            goToBoard
        };
    }
};
</script>



<style>
.button-area{
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
}
.button-area > button {
    background-color: #03c75a;
}

.board-list {
    width: 800px;
    margin: 0 auto;
    text-align: center;

    h2 {
        margin-bottom: 20px;
    }

    table {
        width: 100%;
        border-collapse: collapse;

        th, td {
            border: 1px solid #ddd;
            padding: 10px;
        }

        th {
            background-color: #f5f5f5;
        }
    }

    .pagination {
        margin-top: 20px;
        margin-bottom: 20px;
        button {
            padding: 8px 12px;
            margin: 0 5px;
            cursor: pointer;
            border: none;
            background-color: #007bff;
            color: white;
            border-radius: 5px;

            &:disabled {
                background-color: #ccc;
                cursor: not-allowed;
            }
        }

    }
}
</style>
