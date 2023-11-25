document.addEventListener("DOMContentLoaded", function () {
  let enamaUser = document.querySelector(".userName");
  let escoreUser = document.querySelectorAll(".scoreUser");
  let elementSoal = document.querySelector(".question");
  let elementPilihan = document.querySelector(".formAnswer");
  let inputNama = document.querySelector("#nama");
  let tombolMulai = document.querySelector(".Start");
  let eAudio = document.getElementById("audio");
  let audioMenang = document.getElementById("audioWon");
  let audioKalah = document.getElementById("audioLost");
  let tombolAudio = document.getElementById("buttonAudio");
  let section2 = document.getElementById('sectionHelp');
  let simpanNama;
  let simpanScore = 0;
  let posisiPolisi = 0;
  let panjangCard = document.getElementsByClassName("card1").length;
  let posisiPencuri = Math.floor(panjangCard / 2);
  const posisiGameOver = panjangCard - 1;

  const soal = [
    {
      pertanyaan: "Siapa Presiden Indonesia yang ketiga?",
      pilihan: {
        A: "BJ. Habibie",
        B: "Joko Widodo",
        C: "Soekarno",
        D: "Abdurrahman Wahid",
      },
      kunciJawaban: "A",
    },
    {
      pertanyaan: "Pulau Komodo terletak di provinsi?",
      pilihan: {
        A: "Bali",
        B: "NTT",
        C: "NTB",
        D: "Jawa Timur",
      },
      kunciJawaban: "B",
    },
    {
      pertanyaan: "Apa singkatan dari MPR?",
      pilihan: {
        A: "Majelis Perwakilan Rakyat",
        B: "Majelis Permusyawaratan Rakyat",
        C: "Majelis Perhimpunan Rakyat",
        D: "Majelis Perserikatan Rakyat",
      },
      kunciJawaban: "B",
    },
    {
      pertanyaan: "Tanah yang baik untuk pertanian adalah… ",
      pilihan: {
        A: "Humus",
        B: "Pasir",
        C: "Liat",
        D: "Cadas",
      },
      kunciJawaban: "A",
    },
    {
      pertanyaan:
        "Disebut apakah binatang yang dapat hidup di dua alam, yaitu darat dan laut?",
      pilihan: {
        A: "Amfibi",
        B: "Mamalia",
        C: "Reptil",
        D: "Pisces",
      },
      kunciJawaban: "A",
    },
    {
      pertanyaan: "Negara dengan julukan Tirai Bambu adalah Negara…",
      pilihan: {
        A: "Cina",
        B: "Jepang",
        C: "Singapura",
        D: "Indonesia",
      },
      kunciJawaban: "A",
    },
    {
      pertanyaan: "Candi Borubur merupakan candi agama?",
      pilihan: {
        A: "Hindhu",
        B: "Konghuchu",
        C: "Katholik",
        D: "Buddha",
      },
      kunciJawaban: "D",
    },
    {
      pertanyaan: "Berapa hasil dari (200 x 5 + 100 / 20)0?",
      pilihan: {
        A: "1.005",
        B: "0,5",
        C: "0",
        D: "100",
      },
      kunciJawaban: "C",
    },
    {
      pertanyaan: "Siapakah presiden pertama Indonesia?",
      pilihan: {
        A: "Soekarno",
        B: "Soeharto",
        C: "Joko Widodo",
        D: "Gus Dur",
      },
      kunciJawaban: "A",
    },
    {
      pertanyaan: "Apa lambang negara Indonesia?",
      pilihan: {
        A: "Naga",
        B: "Harimau",
        C: "Burung Garuda",
        D: "Burung Elang",
      },
      kunciJawaban: "C",
    },
    {
      pertanyaan: "Apa warna dari bendera Indonesia?",
      pilihan: {
        A: "Merah",
        B: "Putih",
        C: "Merah dan putih",
        D: "Merah, putih, dan biru",
      },
      kunciJawaban: "C",
    },
    {
      pertanyaan: "Globalisasi berasal dari kata 'globe' yang artinya ...",
      pilihan: {
        A: "Bumi",
        B: "Langit",
        C: "Laut",
        D: "Dunia",
      },
      kunciJawaban: "D",
    },
    {
      pertanyaan:
        "Jika perlu waktu merebus 20 menit agar sebutir telur bisa matang, berapa lama waktu merebus yang dibutuhkan agar 10 butir telur bisa matang?",
      pilihan: {
        A: "200 menit",
        B: "20 menit",
        C: "10 menit",
        D: "100 menit",
      },
      kunciJawaban: "B",
    },
    {
      pertanyaan:
        "Bilangan yang lebih besar dari 32 dan lebih kecil dari 35 adalah…",
      pilihan: {
        A: "33 dan 34",
        B: "31 dan 34",
        C: "32 dan 35",
        D: "33 dan 35",
      },
      kunciJawaban: "A",
    },
    {
      pertanyaan: "Indonesia merdeka pada tanggal?",
      pilihan: {
        A: "17 juli 1945",
        B: "18 Agustus 1945",
        C: "17 Agustus 1946",
        D: "17 Agustus 1945",
      },
      kunciJawaban: "D",
    },
  ];
  
  let jumlahSoal = soal.length;
  let indexSoal;
  let soalSekarang;
  let road = document.getElementsByClassName("road");
  road[posisiPolisi].style.background = "#326af6";
  road[posisiPencuri].style.background = "#326af6";
  road[posisiGameOver].style.background = "red";
  road[posisiGameOver].style.border = "unset";

  function acakindex(min, max) {
    let rendom = Math.floor(Math.random() * max + min);
    return rendom;
  }
  indexSoal = acakindex(0, jumlahSoal - 1);

  function masukanScore(elemen, score) {
    for (let i = 0; i < elemen.length; i++) {
      elemen[i].innerHTML = score;
      if (score < 0) {
        elemen[i].style.color = "red";
      } else {
        elemen[i].style.color = "#326af6";
      }
    }
  }

  elementPilihan.addEventListener('submit', function (event) {
    event.preventDefault();
  });

  tombolMulai.addEventListener("click", function () {
    if (inputNama.value != "") {
      section2.style.display = 'none'
      Putaraudio();
      simpanNama = inputNama.value;
      enamaUser.innerHTML = simpanNama;
      masukanScore(escoreUser, simpanScore);
      document.querySelector(".formNama").style.display = "none";
      tampilkanSoal();
    } else {
      alert("Masukan Nama Anda Telebih Dahulu!!!");
    }
  });

  function tampilkanSoal() {
    soalSekarang = soal[indexSoal];
    elementSoal.innerHTML = soalSekarang.pertanyaan;
    elementSoal.style.animation = "opacity 0.5s ease";
    let simpanPilihan = "";
    for (let pilih in soalSekarang.pilihan) {
      simpanPilihan += `<label class="labelAnswer"><input type="radio" name="answer" value="${pilih}"> ${soalSekarang.pilihan[pilih]}</label>`;
    }
    elementPilihan.innerHTML = simpanPilihan;
    elementPilihan.style.animation = "opacity 0.5s ease";
    let labelPilihan = document.querySelectorAll(".labelAnswer");
    labelPilihan.forEach(function (label) {
      label.addEventListener("click", function () {
        cekJawaban();
        indexSoal = acakindex(0, jumlahSoal - 1);
      });
    });
  }

  function cekJawaban() {
    let jawabanUser = document.querySelector("input[name=answer]:checked");
    if (jawabanUser.value === soal[indexSoal].kunciJawaban) {
      simpanScore += 25;
      masukanScore(escoreUser, simpanScore);
      if (posisiPolisi !== posisiPencuri - 1) {
        let divFoto = document.getElementsByClassName("divFoto");
        let iconPolisi = divFoto[posisiPolisi].querySelector("#polisi");
        let polisiMenang = "Mantap Jawaban Anda Benar!";
        road[posisiPolisi].style.background = "unset";
        iconPolisi.remove();
        posisiPolisi++;
        road[posisiPolisi].style.background = "#326af6";
        divFoto[posisiPolisi].innerHTML ='<img id="polisi" src="aset/gambar/polisi.png" alt="">';
        responJawaban(polisiMenang);
      } else if (posisiPolisi == posisiPencuri - 1) {
        let divFoto = document.getElementsByClassName("divFoto");
        let iconPolisi = divFoto[posisiPolisi].querySelector("#polisi");
        let polisiMenang = "Selamat Anda Memenangkan Permainan!";
        let penentu = 1;
        road[posisiPolisi].style.background = "unset";
        iconPolisi.remove();
        posisiPolisi++;
        road[posisiPolisi].style.background = "#326af6";
        divFoto[posisiPolisi].innerHTML =
          '<img id="polisi" src="aset/gambar/polisi2.png" alt=""> <img id="pencuri" src="aset/gambar/pencuri2.png" alt="">';
        responJawaban(polisiMenang, penentu);
      }
    } else {
      simpanScore -= 30;
      masukanScore(escoreUser, simpanScore);
      if (posisiPencuri !== posisiGameOver - 1) {
        let divFoto = document.getElementsByClassName("divFoto");
        let iconPencuri = divFoto[posisiPencuri].querySelector("#pencuri");
        let pencuriMenang = "Yahh Jawaban Anda Salah!";
        road[posisiPencuri].style.background = "unset";
        iconPencuri.remove();
        posisiPencuri++;
        road[posisiPencuri].style.background = "#326af6";
        divFoto[posisiPencuri].innerHTML ='<img id="pencuri" src="aset/gambar/pencuri.png" alt="">';
        responJawaban(pencuriMenang);
      } else if (posisiPencuri == posisiGameOver - 1) {
        let divFoto = document.getElementsByClassName("divFoto");
        let iconPencuri = divFoto[posisiPencuri].querySelector("#pencuri");
        let pencuriMenang = "Yahh Anda Kalah!";
        let penentu = 2;
        road[posisiPencuri].style.background = "unset";
        iconPencuri.remove();
        posisiPencuri++;
        road[posisiPencuri].style.background = "red";
        divFoto[posisiPencuri].innerHTML =
          '<img id="pencuri" src="aset/gambar/pencuri.png" alt=""> <img id="gameOver" src="aset/gambar/bendera.png" alt="">';
        responJawaban(pencuriMenang, penentu);
      }
    }
  }

  function responJawaban(ket, penentu = 0) {
    let respon = document.querySelector(".div3");
    let keterangan = document.querySelector(".textWon");
    let tombolRespon = document.querySelector("#repeat");
    if (ket != null) {
      respon.style.display = "block";
      respon.style.animation = "opacity 0.8s ease";
      keterangan.innerHTML = ket;
      if (penentu == 1) {
        audioMenang.play();
        eAudio.volume = 0.3;
      } else if (penentu == 2) {
        audioKalah.play();
        eAudio.volume = 0.3;
      }
      tombolRespon.addEventListener("click", function () {
        respon.style.display = "none";
        if (penentu != 0) {
          location.reload();
        } else {
          tampilkanSoal();
        }
      });
    } else {
      respon.style.display = "none";
    }
  }

  function Putaraudio() {
    eAudio.play();
    tombolAudio.style.display = 'block'
      if (eAudio.paused) {
        tombolAudio.innerHTML = "&#9654;";
      } else {
        tombolAudio.innerHTML = "&#10074;&#10074;";
    }
    tombolAudio.addEventListener("click", function () {
      if (eAudio.paused) {
        eAudio.play();
        tombolAudio.innerHTML = "&#10074;&#10074;";
      } else {
        eAudio.pause();
        tombolAudio.innerHTML = "&#9654;";
      }
    });
  }

  function hoverElemen() {
    let judulSection = document.querySelector('.titleSection');
    let elemenHover = document.getElementsByClassName('content');
    for (let i = 0; i < elemenHover.length; i++){
      elemenHover[i].addEventListener('mouseover', function () {
        judulSection.style.filter = 'grayscale(0%)'
      })
      elemenHover[i].addEventListener('mouseout', function () {
        judulSection.style.filter = 'grayscale(100%)'
      })
    }
  }
  hoverElemen();

});

