

        document.addEventListener('DOMContentLoaded', () => {
            // --- 모바일 메뉴 토글 기능 ---
            const menuButton = document.getElementById('menu-toggle-button');
            const sidebar = document.getElementById('sidebar');
            
            menuButton.addEventListener('click', (e) => {
                e.stopPropagation(); 
                sidebar.classList.toggle('open');
            });
            
            // 사이드바 외부 클릭 시 닫기
            document.addEventListener('click', (event) => {
                const isClickInsideSidebar = sidebar.contains(event.target);
                const isClickOnButton = menuButton.contains(event.target);
                
                if (!isClickInsideSidebar && !isClickOnButton && sidebar.classList.contains('open')) {
                    sidebar.classList.remove('open');
                }
            });

            // --- 시간 표시 업데이트 시뮬레이션 ---
            function updateTime() {
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                let hours = now.getHours();
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');
                const timeString = `${year}. ${month}. ${day}. ${hours}:${minutes}:${seconds}`;
                document.getElementById('current-time').textContent = timeString;
            }

            updateTime();
            setInterval(updateTime, 1000);
            
            // --- 모바일 뷰에서 알림 피드 고정 해제 (반응형 대응) ---
            function checkMobileView() {
                const alertPanel = document.getElementById('alert-panel');
                // 1200px 이하에서는 sticky 해제 (CSS 미디어 쿼리 조정에 따름)
                if (window.innerWidth <= 1200) {
                    alertPanel.style.position = 'static';
                } else {
                    alertPanel.style.position = 'sticky';
                }
            }
            
            window.addEventListener('resize', checkMobileView);
            checkMobileView();
            
            // --- 그래프 데이터 포인트 위치 조정 (Mock Chart 디버깅) ---
            // Y축 레이블 위치 보정 (심박수/호흡수)
            // (Mock Chart의 absolute top/bottom 위치를 조정하는 로직은 CSS에 반영되었음)

        });

        // main.js 파일의 DOMContentLoaded 이벤트 리스너 내부에 추가

// --- 사이드바 메뉴 토글 기능 ---
const menuToggleItems = document.querySelectorAll('.menu-toggle-item');

menuToggleItems.forEach(item => {
    item.addEventListener('click', (e) => {
        // 기본 링크 동작 방지
        e.preventDefault(); 
        
        // 클릭된 메뉴 항목에 'open' 클래스 토글
        const wasOpen = item.classList.contains('open');
        
        // 1. 현재 클릭된 항목이 이미 열려있지 않다면, 모든 메뉴 닫기 (아코디언 효과)
        if (!wasOpen) {
            menuToggleItems.forEach(otherItem => {
                otherItem.classList.remove('open');
            });
        }

        // 2. 현재 항목 열기/닫기
        item.classList.toggle('open');
        
        // 3. 'active' 클래스 처리: 현재 클릭된 항목을 active로 만들고, 다른 active를 제거
        if (!item.classList.contains('active')) {
            document.querySelectorAll('.sidebar-menu a.active').forEach(activeItem => {
                activeItem.classList.remove('active');
            });
            item.classList.add('active');
        }
        
        // 4. 서브 메뉴 내의 링크를 클릭할 경우 active 유지 로직은 필요에 따라 추가
        
    });
});

// main.js 파일의 DOMContentLoaded 이벤트 리스너 내부에 추가

// --- 알림 피드 필터링 기능 ---
const filterButtons = document.querySelectorAll('#alert-panel .alert-bottom-tabs button');
const alertItems = document.querySelectorAll('#alert-feed .alert-item-row');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filterType = button.getAttribute('data-filter');

        // 버튼 활성화 상태 업데이트
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // 알림 리스트 필터링
        alertItems.forEach(item => {
            const itemType = item.getAttribute('data-type');
            
            if (filterType === 'all' || itemType === filterType) {
                item.style.display = 'flex'; // 보이게 함
            } else {
                item.style.display = 'none'; // 숨김
            }
        });
    });
});