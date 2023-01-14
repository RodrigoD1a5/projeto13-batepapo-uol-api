import dayjs from "dayjs";

export function pegarHoraAtual() {
    const hora = Number(dayjs().hour()).toLocaleString("pt-br", { minimumIntegerDigits: 2 });
    const minuto = Number(dayjs().minute()).toLocaleString("pt-br", { minimumIntegerDigits: 2 });
    const segundo = Number(dayjs().second()).toLocaleString("pt-br", { minimumIntegerDigits: 2 });

    return `${hora}:${minuto}:${segundo}`;
};