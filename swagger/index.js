import { dirname, join } from 'path';
import swaggerAutogen from 'swagger-autogen';
import { fileURLToPath } from 'url';

const _dirname = dirname(fileURLToPath(import.meta.url));

const doc = {
    // общая информация
    info: {
        title: 'User JWT auth service API',
        description: 'My todo API',
    },
    // что-то типа моделей
    definitions: {
        // модель задачи
        Todo: {
            id: '1',
            text: 'test',
            done: false,
        },
        // модель массива задач
        Todos: [
            {
                // ссылка на модель задачи
                $ref: '#/definitions/Todo',
            },
        ],
        // модель объекта с текстом новой задачи
        UserLogin: {
            success: true,
            access_token:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAZ21haWwuY29tIiwiaWF0IjoxNjg3NTY2NDAzLCJleHAiOjE2ODc1NjcwMDN9.KAbmo5Hxmt4OeUEn1P6VdSbdbKdKq-ZdAKN28El3nKs',
            at_expires_at: 1687567003493,
        },
        // модель объекта с изменениями существующей задачи
        Changes: {
            changes: {
                text: 'test',
                done: true,
            },
        },
    },
    host: 'localhost:8000',
    schemes: ['http'],
};

// путь и название генерируемого файла
const outputFile = join(_dirname, 'output.json');
// массив путей к роутерам
const endpointsFiles = [join(_dirname, '../dist/index.js')];

swaggerAutogen(/*options*/)(outputFile, endpointsFiles, doc).then(({ success }) => {
    // eslint-disable-next-line no-undef
    console.log(`Generated: ${success}`);
});
