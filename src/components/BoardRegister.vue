<template>
    <div class="board-register">
        <h2>게시글 작성</h2>

        <div class="form-group">
            <label for="title">제목</label>
            <input v-model="boardData.title" type="text" id="title" placeholder="제목을 입력하세요" />
        </div>

        <div class="form-group">
            <label for="writer">작성자</label>
            <input v-model="boardData.writer" type="text" id="writer" placeholder="작성자를 입력하세요" />
        </div>

        <div class="form-group">
            <label for="content">내용</label>
            <textarea v-model="boardData.content" id="content" placeholder="내용을 입력하세요"></textarea>
        </div>

        <div class="button-area">
            <button @click="registerBoard">등록</button>
        </div>
    </div>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useBoardStore } from "../stores/useBoardStore";

export default {
    setup() {
        const boardStore = useBoardStore();
        const router = useRouter();

        // 게시글 정보 객체
        const boardData = reactive({
            title: "",
            content: "",
            writer: ""
        });

        // 게시글 등록 함수
        const registerBoard = async () => {
            if (!boardData.title.trim() || !boardData.content.trim() || !boardData.writer.trim()) {
                alert("제목, 내용, 작성자를 입력해주세요.");
                return;
            }

            await boardStore.registerBoard(boardData);
            alert("게시글이 등록되었습니다.");
            router.push("/board/list"); // 게시글 목록 페이지로 이동
        };

        return {
            boardData,
            registerBoard
        };
    }
};
</script>

<style>
.board-register {
    width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: left;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
    margin-right: 10px;
    padding: 10px;
}

label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
}

input, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    background-color: white;
    transition: border-color 0.3s ease-in-out;
}

input:focus, textarea:focus {
    outline: none;
    border-color: #007bff;
}

textarea {
    height: 100px;
    resize: none;
}

.button-area {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
}

button {
    padding: 10px 16px;
    font-size: 14px;
    font-weight: bold;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
}

button:hover {
    background-color: #0056b3;
}
</style>
