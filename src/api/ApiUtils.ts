import Cookies from 'js-cookie';
import { getRefreshToken, getToken, setRefreshToken, setToken } from './AuthenticationApi';
import { QuizAnswerRequest } from '../modal/QuizAnswerRequest';
import { ExerciseRequest } from '../modal/ExerciseRequest';
import { CustomQuizRequest } from '../modal/CustomQuizRequest';

export const apiUrl = process.env.REACT_APP_API_URL;
export const apiWsUrl = process.env.REACT_APP_WS_URL;
export const baseUrlBlob = process.env.REACT_APP_API_BLOB_URL;

export async function get(url: string, retryCount = 0): Promise<any> {
    const token = getToken();
    try {
        let response = await await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            method: "GET"
        });
        if (response.status === 401 && retryCount < 1) {
            await refreshTokens();
            return get(url, retryCount + 1);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}


export const createQuizFormData = (customQuizRequest: CustomQuizRequest): FormData => {
    const formData = new FormData();
    const customQuiz = customQuizRequest;
    formData.append("typeQuiz", customQuiz.typeQuiz.toString());
    formData.append("question", customQuiz.question);
    // Thêm file imageQuestion nếu có
    if (customQuiz.imageQuestion) {
        formData.append("imageQuestion", customQuiz.imageQuestion);
    }
    // Thêm mảng quizAnswers vào FormData
    customQuiz.quizAnswers.forEach((answer: QuizAnswerRequest, index: number) => {
        formData.append(`quizAnswers[${index}].answer`, answer.answer);
        formData.append(`quizAnswers[${index}].correct`, answer.correct.toString());

        if (answer.imgAnswer) {
            formData.append(`quizAnswers[${index}].imgAnswer`, answer.imgAnswer);
        }
    });

    return formData;
};

export async function post(url: string, retryCount = 0, body: any): Promise<any> {
    const token = getToken();
    const headers: Record<string, string> = {
        'Authorization': `Bearer ${token}`,
    };

    // Chỉ thêm Content-Type là application/json nếu body không phải FormData
    const isFormData = body instanceof FormData;
    if (!isFormData) {
        headers['Content-Type'] = 'application/json';
    }

    try {
        const response = await fetch(url, {
            headers: headers,
            method: "POST",
            body: isFormData ? body : JSON.stringify(body), // Không stringify nếu body là FormData
        });

        if (response.status === 401 && retryCount < 1) {
            await refreshTokens();
            return post(url, retryCount + 1, body);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

export async function postFormData(
    url: string,
    retryCount = 0,
    body: any,
    file?: File
): Promise<any> {
    const token = getToken();

    try {
        // Khởi tạo FormData
        const formData = new FormData();

        // Thêm file nếu có
        if (file) {
            formData.append("file", file);
        }

        // Thêm JSON payload
        const jsonBlob = new Blob([JSON.stringify(body)], { type: "application/json" });
        formData.append("data", jsonBlob);

        // Gửi request
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: "POST",
            body: formData,
        });

        if (response.status === 401 && retryCount < 1) {
            await refreshTokens();
            return postFormData(url, retryCount + 1, body, file);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

export async function putFormData(
    url: string,
    retryCount = 0,
    body: any,
    file?: File
): Promise<any> {
    const token = getToken();

    try {
        // Khởi tạo FormData
        const formData = new FormData();

        // Thêm file nếu có
        if (file) {
            formData.append("file", file);
        }

        // Thêm JSON payload
        const jsonBlob = new Blob([JSON.stringify(body)], { type: "application/json" });
        formData.append("data", jsonBlob);

        // Gửi request
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: "PUT",
            body: formData,
        });

        if (response.status === 401 && retryCount < 1) {
            await refreshTokens();
            return putFormData(url, retryCount + 1, body, file);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

export async function del(url: string, retryCount = 0): Promise<any> {
    const token = getToken();
    try {
        let response = await await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            method: "DELETE",
        });
        if (response.status === 401 && retryCount < 1) {
            await refreshTokens();
            return del(url, retryCount + 1);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}
export async function put(url: string, retryCount = 0, body: any): Promise<any> {
    const token = getToken();
    try {
        let response = await await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            method: "PUT",
        });
        if (response.status === 401 && retryCount < 1) {
            await refreshTokens();
            return put(url, retryCount + 1, body);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}



export async function requestWithMethod(url: string, method = 'GET', body: any, retryCount = 0): Promise<any> {

    try {
        let response = await fetchWithMethodAuthorization(url, body, method);
        if (response.status === 403 && retryCount < 1) {
            await refreshTokens();
            return requestWithMethod(url, method, body, retryCount + 1);
        }
        return await response.json();
    } catch (error) {
        console.error('url request:', url, 'Failed to make request requestWithMethod:', error);
        // throw error;
    }
}
export async function requestWithPost(url: string, body: any, retryCount = 0): Promise<any> {
    try {
        let response = await fetchWithPostAuthorization(url, body);
        if (response.status === 403 && retryCount < 1) {
            await refreshTokens();
            return requestWithPost(url, body, retryCount + 1);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to make request post:', error);
        // throw error;
    }


}

export async function requestWithPostFile(url: string, body: FormData, retryCount = 0): Promise<any> {
    try {
        let response = await fetchWithPostFileAuthorization(url, body);
        if (response.status === 403 && retryCount < 1) {
            await refreshTokens();
            return requestWithPostFile(url, body, retryCount + 1);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to make request post:', error);
        // throw error;
    }

}
async function fetchWithPostFileAuthorization(url: string, body: any) {
    const token = getToken();
    return await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: body,
        method: 'POST'
    });
}
async function fetchWithPostAuthorization(url: string, body: any) {
    const token = getToken();
    return await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        method: 'POST'
    });
}

async function fetchWithMethodAuthorization(url: string, body: any, method = 'GET') {
    console.log("json", JSON.stringify(body));
    const token = getToken() || '';
    return await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        method: method,
        body: JSON.stringify(body)
    });
}
export async function refreshTokens() {
    try {
        const url = `http://localhost:8080/auth/refresh`;
        const response = await fetch(url, {
            headers: {
                'Refresh-Token': getRefreshToken() as string,
            },
            credentials: 'include',
            method: 'POST'
        });

        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }

        const responseData = await response.json(); // Parse JSON response

        const newAccessToken = responseData.data.accessToken;
        const newRefreshToken = responseData.data.refreshToken;
        setToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        if (!newAccessToken || !newRefreshToken) {
            throw new Error('Failed to retrieve new tokens from response data');
        }
    } catch (error) {
        throw new Error('Failed to refresh token');
    }
}
// export const baseAvatarUrl = 'http://localhost:8080/api/v1/users/avatar/view/';
export const verifyToken = async (): Promise<any> => {
    const token = getToken();
    try {
        const url = "http://localhost:8080/auth/verify-token";
        const response = await fetch(url, {
            headers: { 'Access-Token': token || '' },
            method: 'POST',
        });
        return await response.json();
    } catch (error) {
        console.error('Failed to verify token:', error);
    }
}

export const deleteToken = () => {
    Cookies.remove('token');
    Cookies.remove('refreshToken');
}
