import os
import json

mypath = "D:\\Programs\\OpenServer\\domains\\hosting\\VideoHosting\\data\\Курсы"
all_files = os.listdir(mypath)
courses_main_folders = []
courses_sub_folders = []


def check_file_type(file):
    if (
        file[-4::] == ".pdf"
        or file[-4::] == ".mp4"
        or file[-5::] == ".html"
        or file[-4::] == ".txt"
        or file[-4::] == ".zip"
    ):
        x = True
    else:
        x = False

    return x


# Все названия курсов
for dir in all_files:
    courses_main_folders.append(dir)

for dir in courses_main_folders:
    courses_sub_folders.append(os.listdir(f"{mypath}\\{dir}"))


for files_list in courses_sub_folders:
    count = len(files_list)
    while count != 0:
        for item in files_list:
            # Если файл то убираем
            if check_file_type(item):
                files_list.remove(item)
            # Если папка оставляем
            else:
                pass
        count -= 1

# * Все папки внутри главной папки
# print(courses_sub_folders)

# * 27 курсов
courses = []


for i in range(len(all_files) + 1):
    course_content = {}

    def create_course():
        course_content["Название курса"] = courses_main_folders[i - 1]
        course_content["Папки"] = courses_sub_folders[i - 1]

    create_course()

    courses.append(course_content)

# Массив с курсами в виде словарей
# print(courses)


# Один курс
for course in courses:
    if course["Папки"] == []:
        course["Файлы"] = os.listdir(f"{mypath}\\{course['Название курса']}")
    else:
        for i in course["Папки"]:
            count = len(course["Папки"])
            while count != 0:
                course[f"{i}"] = os.listdir(
                    f"{mypath}\\{course['Название курса']}\\{i}"
                )
                for z in course[f"{i}"]:
                    if (
                        z[-4::] == ".pdf"
                        or z[-4::] == ".mp4"
                        or z[-3::] == ".py"
                        or z[-3::] == ".js"
                        or z[-3::] == ".gz"
                        or z[-5::] == ".html"
                        or z[-5::] == ".webm"
                        or z[-5::] == ".xlsx"
                        or z[-5::] == ".json"
                        or z[-5::] == ".docx"
                        or z[-5::] == ".pptx"
                        or z[-4::] == ".txt"
                        or z[-4::] == ".rtf"
                        or z[-4::] == ".pkt"
                        or z[-4::] == ".svg"
                        or z[-4::] == ".sfk"
                        or z[-4::] == ".apk"
                        or z[-4::] == ".jar"
                        or z[-4::] == ".yml"
                        or z[-4::] == ".css"
                        or z[-4::] == ".csv"
                        or z[-4::] == ".gif"
                        or z[-4::] == ".TTF"
                        or z[-13::] == ".unitypackage"
                        or z[-4::] == ".zip"
                        or z[-4::] == ".key"
                        or z[-4::] == ".ico"
                        or z[-4::] == ".png"
                        or z[-4::] == ".srt"
                        or z[-4::] == ".jpg"
                        or z[-4::] == ".url"
                        or z[-6::] == ".cache"
                        or z[-10::] == "Dockerfile"
                    ):
                        pass
                    else:
                        course[f"{z}"] = os.listdir(
                            f"{mypath}\\{course['Название курса']}\\{i}\\{z}"
                        )
                count -= 1

    print("\n")
    print(course)

# * Примеры
# Название курса ---> Внутренние папки ---> Файлы
# uniq = [1, 2, 3, 4, 5]
# fifa = ["a", "b", "c", "d", "e"]
# uniq_and_fifa = dict(zip(uniq, fifa))
# print(uniq_and_fifa)

#! Работа с json
# data = dict(zip(all_files, courses))
data = courses
with open("video_content.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

with open("video_titles.json", "w", encoding="utf-8") as f:
    json.dump(all_files, f, ensure_ascii=False, indent=4)
