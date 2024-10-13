import {Postcode} from 'src/defines/postcode';

export const formatPostcode = (data: Postcode) => {
    let formattedAddress = '';
    Object.keys(data).forEach(key => {
        const value = data[key] || ''; // 값이 없으면 ''로 설정
        formattedAddress += `${key}: ${value}\n`; // 각 줄마다 key: value 형식으로 추가
    });
    return formattedAddress;
};
