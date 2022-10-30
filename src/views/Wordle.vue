<template>
    <Alert />

    <div class="wordle-games">
        <div class="wordle-game" v-for="(game) in games" :key="game.id">
            <div class="player">
                <img class="player__avatar" :src="game.user.avatar">
                <div class="player__name">{{ game.user.username }}</div>
            </div>
            <div class="board">
                <div class="board__row" v-for="(row, rowIndex) in game.board">
                    <div class="board__letter"
                        :class="[{ 'board__letter--wrong': letter == 1 }, { 'board__letter--partial': letter == 2 }, { 'board__letter--correct': letter == 3 }]"
                        v-for="(letter, letterIndex) in row">
                        <span v-if="game.guesses.length > rowIndex">{{ game.guesses[rowIndex][letterIndex] }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            games: []
        };
    },
    mounted() {
        this.$socket.emit('wordleSubscribe');
    },
    sockets: {
        wordleUpdate: function (games) {
            this.games = games;
        }
    },
}
</script>
<style lang="scss">
.wordle-games {
    align-items: flex-start;
    align-content: flex-start;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem;
}

.wordle-game {
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15);
    padding: .5rem;
    border-radius: .5rem;

    .player {
        align-items: center;
        display: flex;
        gap: .5rem;
        margin-bottom: .5rem;
        &__avatar{
            border-radius: 2rem;
            height: 2rem;
            width: 2rem;
        }
    }

    .board {
        display: flex;
        flex-direction: column;
        gap: 4px;

        &__row {
            display: flex;
            gap: 4px;

        }

        &__letter {
            align-items: center;
            background: rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            color: #ffffff;
            display: flex;
            height: 2rem;
            justify-content: center;
            text-transform: uppercase;
            width: 2rem;

            &--wrong {
                background: #7e7e7e;
            }

            &--partial {
                background: #c9b458;
            }

            &--correct {
                background: #4caf50;
            }
        }
    }
}
</style>
