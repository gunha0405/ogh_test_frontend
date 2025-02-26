<template>
    <div class="board-read">
        <h2>{{ boardStore.board.title }}</h2>
        <p class="writer">작성자: {{ boardStore.board.writer }}</p>
        <div class="content">
            <p>{{ boardStore.board.content }}</p>
        </div>

        <!-- 댓글 목록 -->
        <div class="comments">
            <h3>댓글</h3>
            <ul>
                <li v-for="(comment, index) in boardStore.board.comments" :key="index">
                    <p><strong>{{ comment.writer }}:</strong> {{ comment.content }}</p>
                </li>
            </ul>
        </div>

        <!-- 댓글 작성 -->
        <div class="comment-form">
            <h3>댓글 작성</h3>
            <input v-model="newComment.writer" type="text" placeholder="작성자" />
            <textarea v-model="newComment.content" placeholder="댓글 내용을 입력하세요"></textarea>
            <button @click="registerComment">등록</button>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useBoardStore } from "../stores/useBoardStore";
import { useRoute } from "vue-router";

export default {
    setup() {
        const boardStore = useBoardStore();
        const route = useRoute();
        const boardIdx = route.params.boardIdx; // URL에서 boardIdx 가져오기

        // 새로운 댓글 객체
        const newComment = reactive({
            writer: "",
            content: ""
        });

        // 댓글 등록 함수
        const registerComment = async () => {
            if (!newComment.writer.trim() || !newComment.content.trim()) {
                alert("작성자와 내용을 입력해주세요.");
                return;
            }

            await boardStore.registerComment(boardIdx, newComment);
            newComment.writer = ""; // 입력 필드 초기화
            newComment.content = "";
        };

        // 게시글 상세정보 불러오기
        onMounted(() => {
            boardStore.fetchBoardDetail(boardIdx);
        });

        return {
            boardStore,
            newComment,
            registerComment
        };
    }
};
</script>

<style>
.board-read {
    width: 80%;
    margin: 0 auto;
    text-align: left;

    h2 {
        text-align: center;
        margin-bottom: 10px;
    }

    .writer {
        text-align: center;
        font-weight: bold;
        margin-bottom: 20px;
    }

    .content {
        padding: 20px;
        border: 1px solid #ddd;
        background-color: #f9f9f9;
        border-radius: 5px;
        margin-bottom: 20px;
    }

    .comments {
        margin-top: 20px;

        h3 {
            margin-bottom: 10px;
        }

        ul {
            list-style: none;
            padding: 0;

            li {
                padding: 10px;
                border-bottom: 1px solid #ddd;
            }
        }
    }
}
.comment-form {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.comment-form h3 {
    margin-bottom: 15px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
}

.comment-form input,
.comment-form textarea {
    width: 80%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    background-color: white;
    transition: border-color 0.3s ease-in-out;
}

.comment-form input:focus,
.comment-form textarea:focus {
    outline: none;
    border-color: #007bff;
}

.comment-form textarea {
    height: 100px;
    resize: none;
}

.comment-form button {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
}

.comment-form button:hover {
    background-color: #0056b3;
}
</style>
