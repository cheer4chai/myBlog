<template>
  <div class="exhibitions-wrap">
        <article class="exhibition-listing odd">
            <a class="wrap" href="/exhibitions/detail/doreen-blumhardt">
                <div class="text firstText">
                    <h3>Doreen Blumhardt: Jet-Powered Meteor</h3>
                    <p class="date">13 Dec 2017 – 01 Apr 2018</p>
                    <p class="link">Info</p>
                </div>
                <div class="image-wrap">
                    <div class="image-wrap2">
                    <div class="image">
                        <img src="../assets/logo.png" width="210" height="210" alt="">
                        </div>
                    </div>
                </div>
            </a>
        </article>
        <article class="exhibition-listing even">
            <a class="wrap" href="/exhibitions/detail/gavin-hipkins-the-domain">
                <div class="text">
                    <h3>Gavin Hipkins: The Domain</h3>
                    <p class="date">25 Nov 2017 – 25 Mar 2018</p>
                    <p class="link">Info</p>
                </div>
                <div class="image-wrap">
                    <div class="image-wrap2">
                    <div class="image">
                        <img src="../assets/logo.png" width="210" height="210" alt="">
                        </div>
                    </div>
                </div>
            </a>
        </article>
        <footer id="footer"></footer>
  </div>
  
</template>

<script>
export default {
  name: 'project'
}
</script>

<style scoped>
body .exhibitions-wrap {
    text-align: center;
}
.exhibition-listing {
    margin: 70px 0 auto;
    position: relative;
}
.exhibition-listing .text:before {
    content: '';
    position: absolute;
    background: #000;
    width: 5px;
    height: 70px;
    left: 50%;
    margin-left: -2px;
    top: -70px;
}
.exhibition-listing .firstText:before {
    content: '';
    position: absolute;
    background: #000;
    width: 5px;
    height: 100px;
    left: 50%;
    margin-left: -2px;
    top: -100px;
}

.exhibition-listing .text {
    border: 5px solid #000;
    padding: 30px;
    width: 370px;
    margin: 0 auto;
    text-align: center;
    font-size: 18px;
}
.exhibition-listing.odd .image-wrap {
    right: 50%;
    margin-right: 300px;
}
.exhibition-listing.even .image-wrap {
    left: 50%;
    margin-left: 300px;
}
.exhibition-listing .image-wrap {
    position: absolute;
    top: -50px;
}
.exhibition-listing.odd .image-wrap:after {
    content: '';
    position: absolute;
    background: #000;
    height: 5px;
    width: 85px;
    bottom: 50%;
    right: -85px;
}
.exhibition-listing.even .image-wrap:after {
    content: '';
    position: absolute;
    background: #000;
    height: 5px;
    width: 85px;
    bottom: 50%;
    left: -85px;
}
.exhibition-listing .image-wrap .image-wrap2 {
    display: table-cell;
    vertical-align: middle;
    height: 240px;
}
.exhibition-listing .image-wrap .image-wrap2 .image {
    margin-bottom: 0;
    background: #fff;
    border: 5px #000 solid;
    padding: 10px;
    margin: 0 0 50px;
    display: inline-block;
}

.exhibition-listing .image-wrap .image-wrap2 .image img{
    width: 210px;
    height: 210px;
}

</style>
