# GoCo_FrontEnd

## Version
- Java8 (JDK 1.8)
- Spring Boot (2.7.0)
- Maven 4.0.0

- SECURITY(JWT)
	- JJWT-API : 0.11.2
	- JJWT-IMPL : 0.11.2
	- JJWT-JACKSON : 0.11.2
	
	
	<div align="center">
  <br />
  <br />
  <h1> Go Company </h1>
  <br />
</div>

## 목차

1. [**서비스 소개**](#1)
2. [**기술 스택**](#2)
3. [**주요 기능**](#3)
4. [**프로젝트 기간**](#4)


<br/>


<div id="1"></div>

## 💡 서비스 소개

### 근태와 업무, 결재 관리를 한번에! 

> 이번 달 내 근무 시간은 얼마나 될까? 이번 주에 누가 출장이지? 내 휴가 신청이 승인됐을까? <br />
GoCo는 근태와 내 일정관리, 같은 팀원의 출장 / 휴가 / 사내업무 일정확인 , 결재 관리를 캘린더를 통해 한번에 확인 할 수 있습니다.<br />
>
#### 모두에게 편리한 GoCo, Go Company! 출근부터 퇴근까지 함께 하세요! 

<br/>

<div id="2"></div>

## 🛠️ 기술 스택

<details><summary> <b> 상세 기술스택 및 버전</b> </summary>

| 구분       | 기술스택                    | 상세내용                 | 버전          |
| -------- | ----------------------- | -------------------- | ----------- |
| 공통     | 형상관리                    | Github               | \-          |
|          | 이슈관리                   | Notion               | \-          |
|          | 커뮤니케이션                | Notion, Slack        | \-          |
| BackEnd  | DB                      | MySQL                | 8.0.28      |
|          |                         | JPA                  | \-          |
|          |                         | QueryDSL             | \-          |
|          | Java                    | JDK                  | 8           |
|          | Spring                  | Spring Boot          | 2.7.0       |
|          | IDE                     | STS                  | 3.9.15      |
|          | Cloud Storage           | AWS S3               | \-          |
|          | Build                   | Maven                | 4.0.0       |
| FrontEnd | HTML5                   |                      | \-          |
|          | CSS3                    |                      | \-          |
|          | JavaScript(ES8)         |                      | \-          |
|          | 		             | Axios                | 0.27.2      |
|          | React                   | React                | 18.2.0      |
|          | 	                     | React-Router-Dom	    | 6.3.0       |	
|          |                         | Meterial UI          | 5.10.2      |
|          |                         | SweetAlert2          | 11.4.26     |
|          |                         | FullCalendar         | 5.11.2      |
|          | IDE                     | Visual Studio Code   | 1.66.2      |
| Server   | 서버                     | AWS EC2              | \-          |
|          | 플랫폼                    | Ubuntu               | 22.04       |
|          | 배포                     | Travis ci            | \-          |
|          |                         | Ruby                 | 3.0.2       |
|          |                         | AWS CodeDeploy       | \-          |

</details>

<br />

<div id="3"></div>

## 🖥️ 주요 기능

### 근태 관리
- 로그인 후 출근 버튼을 누르면 출근 상태로 전환 되고, 퇴근을 누르면 퇴근 상태로 전환 됩니다.
- 현재 출/퇴근 , 지각,  휴가 , 출장 여부는 헤더에서 확인 할 수 있습니다.

### 결재 관리 ( 💫 박정인 담당 PART 💫 )
- 결재 신청 
  <img width="745" alt="결재신청" src="https://user-images.githubusercontent.com/89882525/234206978-4190c298-ddca-41f9-ad28-75d0d48e9856.png">
 
  1. 결재 신청 전, 미리 정해진 기안서의 양식을 다운로드
  2. 날짜를 선택하여 결재를 신청 할 수 있고 예외 처리는 <br>
       - 날짜 선택 시 잔여 휴가 일수를 초과할 경우 <br> 
       - 중복 된 날짜의 신청이 있을 경우 <br>
      -> 모달창으로 중복날짜 리스트를 띄워 결재 대기 중일 경우 삭제 후 신청 가능 <br> 
       - 기안서 파일을 첨부 하지 않았거나, 양식의 확장자명 (xlsx, xls) 다를 경우 <br> 
       - 정해진 파일 크기를 초과할 경우 <br>
  3. 신청 완료 시 기안서는 S3 버킷의 출장 / 휴가 폴더로 구분하여 업로드 
     ![S3](https://user-images.githubusercontent.com/89882525/234206369-9d49451c-3e0b-4099-9784-029229f67f4c.png) <br>
	
- 결재 관리
  ![goco](https://user-images.githubusercontent.com/89882525/234204213-dd9d3b11-1f7b-48ba-b8f9-ef88ee995768.png)
  1. 결재 신청 한 목록을 확인 가능 
  2. 날짜 별, 승인상태 별 필터
  3. 대기 중인 결재는 삭제가 가능하고 DB와 S3에서도 삭제
  4. 승인 처리 된 결재는 캘린더에 반영 되어 팀원들도 확인 가능
  
- 결재 관리 (관리자 페이지) <br>
   <img width="734" alt="image" src="https://user-images.githubusercontent.com/89882525/234202399-524c3516-b0f6-4f51-b685-51f5ef567ddc.png">
  1. 팀원의 신청 내역을 확인 할 수 있고 이름으로 필터 가능 
  2. 결재의 상세 내용을 확인하고, 기안서 파일을 다운로드 가능  
   -> S3 객체의 경로를 DB에 저장 해놓았다가 그 경로로 다운로드 
  3. 결재는 승인 , 반려 처리 할 수 있으며, 실수로 승인된 결재는 승인 취소 가능
  4. 승인 시 연차 : 신청일수 차감 / 반차 : 0.5일 차감 / 병가 : 차감 없음 
  5. 승인 시 캘린더에 내용 반영 
 


### 일정 관리
- 스케쥴러로 자신의 일정을 등록 및 관리 할 수 있습니다.
- 관리자(팀장)은 팀원들의 일정을 확인 할 수 있습니다.


<div id="4"></div>

## 📆 프로젝트 기간
### 22.7.19 ~ 22.9.27
- 기획 및 설계 : 22.7.19 ~ 22.7.29
- 프로젝트 구현 : 22.7.30 ~ 22.9.15
- 버그 수정 및 산출물 정리 : 22.9.16 ~ 27

<br />

<div id="9"></div>

